#!/usr/bin/env node

const fs = require('node:fs');
const os = require('node:os');
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
const body = marked.parse(markdown);
const html = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><title>${title}</title>
<style>
@page { size: A4; margin: 10mm 12mm 12mm; }
* { box-sizing: border-box; }
body { font-family: "Microsoft JhengHei", "Noto Sans CJK TC", Arial, sans-serif; color: #172033; font-size: 9.3pt; line-height: 1.35; }
h1 { color: #173b69; font-size: 16pt; margin: 0 0 4px; padding-bottom: 3px; border-bottom: 2px solid #4f83bd; }
h2 { color: #173b69; font-size: 11.5pt; margin: 8px 0 4px; padding: 2.5px 6px; border-left: 4px solid #4f83bd; background: #eef5fc; break-after: avoid; }
h3 { color: #294e78; font-size: 10pt; margin: 6px 0 2px; break-after: avoid; }
p { margin: 2.5px 0; }
hr { border: 0; border-top: 1px solid #d8e2ec; margin: 6px 0; }
blockquote { margin: 5px 0; padding: 6px 10px; border-left: 3.5px solid #4f83bd; background: #f4f8fc; border-radius: 0 4px 4px 0; }
blockquote p { margin: 2px 0; }
blockquote h3 { margin: 0 0 3px; }
pre { margin: 5px 0; padding: 6px 10px; background: #f4f8fc; border: 1px solid #b8d0e8; border-radius: 4px; font-family: "Microsoft JhengHei", "Noto Sans CJK TC", Arial, sans-serif; font-size: 8.8pt; line-height: 1.35; white-space: pre-wrap; word-break: break-word; }
pre code { background: none; padding: 0; font-family: inherit; color: inherit; }
table { width: 100%; border-collapse: collapse; margin: 4px 0 6px; font-size: 8.6pt; }
thead { display: table-header-group; }
tr, ol > li { break-inside: avoid; }
th, td { border: 1px solid #a4b6c9; padding: 2.5px 5px; text-align: left; vertical-align: middle; }
th { color: #173b69; background: #dfeaf6; font-weight: bold; }
ol, ul { margin: 2.5px 0 4px; padding-left: 18px; }
li { margin: 1.5px 0 2.5px; }
code { font-family: Consolas, monospace; font-size: .9em; padding: 1px 3px; background: #edf1f5; border-radius: 3px; }
strong { color: #102d50; }
.page-break { break-before: page; }
</style></head><body>${body}</body></html>`;

const tempPath = path.join(os.tmpdir(), `eng-tutor-${process.pid}.html`);
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
    await page.goto(`file:///${tempPath.replace(/\\/g, '/')}`, { waitUntil: 'load' });
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: '<div style="width:100%;font-size:8px;color:#667;text-align:center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: { top: '14mm', right: '15mm', bottom: '16mm', left: '15mm' },
    });
    console.log(`Created ${outputPath}`);
  } finally {
    await browser.close();
    fs.rmSync(tempPath, { force: true });
  }
})().catch((error) => {
  fs.rmSync(tempPath, { force: true });
  console.error(error.message);
  process.exit(1);
});
