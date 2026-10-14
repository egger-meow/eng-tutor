#!/usr/bin/env node

const fs = require('node:fs');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { marked } = require('marked');
const { chromium } = require('playwright');

const input = process.argv[2];
if (!input) {
  console.error('Usage: node scripts/build-student-pdf.cjs weekly/weekNN/01-student-worksheet.md');
  process.exit(1);
}

const sourcePath = path.resolve(input);
if (path.basename(sourcePath) !== '01-student-worksheet.md') {
  console.error('Only 01-student-worksheet.md may be exported to PDF.');
  process.exit(1);
}
if (!fs.existsSync(sourcePath)) {
  console.error(`Input not found: ${sourcePath}`);
  process.exit(1);
}

const markdown = fs.readFileSync(sourcePath, 'utf8');
if (!/^## Homework/m.test(markdown)) {
  console.error('Student handout must include a Homework section before PDF export.');
  process.exit(1);
}

const outputPath = sourcePath.replace(/\.md$/i, '.pdf');
const title = markdown.match(/^#\s+(.+)$/m)?.[1] ?? 'Student Handout';
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
// Only Homework starts a new page automatically; preserve author page breaks.
const body = marked.parse(markdown).replace(
  /<h2>Homework([^<]*)<\/h2>/g,
  '<h2 class="homework-start">Homework$1</h2>',
);
const css = fs.readFileSync(path.join(__dirname, 'student-pdf.css'), 'utf8');
const html = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
<style>${css}</style></head><body>${body}</body></html>`;

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eng-tutor-'));
const tempPath = path.join(tempDir, 'worksheet.html');
fs.writeFileSync(tempPath, html, 'utf8');

(async () => {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean);
  const executablePath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!executablePath) throw new Error('Chrome or Edge was not found. Set CHROME_PATH.');

  const browser = await chromium.launch({ headless: true, executablePath });
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(tempPath).href, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: '<div style="width:100%;font-size:8px;color:#57717b;text-align:center;letter-spacing:1px"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: { top: '14mm', right: '15mm', bottom: '16mm', left: '15mm' },
    });
    console.log(`Created ${outputPath}`);
  } finally {
    await browser.close();
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
})().catch((error) => {
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.error(error.message);
  process.exit(1);
});
