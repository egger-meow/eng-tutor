# PDF 輸出與圖解

學生講義的共用樣式在 `scripts/student-pdf.css`，產生器在 `scripts/build-student-pdf.cjs`。維持 A4、10.2pt 正文、15mm 左右留白；不自動插入封面或放大標題。一般 Markdown 會直接套用標題、表格、引言與程式碼樣式，不需要重寫舊教材。

```bash
node scripts/build-student-pdf.cjs weekly/weekNN/01-student-worksheet.md
```

需要本機 `marked`、`playwright` 套件，以及 Chrome 或 Edge；其他位置的瀏覽器可用 `CHROME_PATH` 指定。只輸出學生講義，且來源必須含有 `## Homework`。輸出會覆寫同名 PDF。既有 `.page-break` 保留；只有 Homework 自動另起一頁，其他最後章節不會被強制換頁。

## 可選圖解元件

只在有助理解時使用，文字仍須遵守本週詞彙上限。不要為了填滿版面增加內容。HTML 區塊內請使用 HTML 標籤，不混用 Markdown；短卡片可加 `keep-together`，長段落避免整塊禁止分頁。

### 重點與易錯提醒

```html
<div class="callout">
<strong>先看時間</strong>
<p>讀完整句子，再選動詞。</p>
</div>

<div class="callout warning">
<strong>常見錯誤</strong>
<p>Does he <s>plays</s> <b>play</b>?</p>
</div>
```

### 兩欄對照

```html
<div class="cards">
<div class="card"><h3>平常</h3><p>He plays.</p></div>
<div class="card"><h3>現在</h3><p>He is playing.</p></div>
</div>
```

### 簡單流程圖

```html
<div class="flow" role="group" aria-label="解題順序">
<div class="flow-step"><strong>1. 看時間</strong>now / every day</div>
<span class="flow-arrow" aria-hidden="true">→</span>
<div class="flow-step"><strong>2. 看主詞</strong>he / they</div>
<span class="flow-arrow" aria-hidden="true">→</span>
<div class="flow-step"><strong>3. 選動詞</strong>is / are</div>
</div>
```

### 例句加旁註

```html
<div class="example">
<strong>Does he play?</strong><span class="note">does 後用原形。</span>
</div>
```

圖片與內嵌 SVG 會限制在頁寬內；圖解必須提供可讀文字，不靠顏色單獨傳達規則。這些元件使用 HTML/CSS，無需外部繪圖服務。需要插圖時另提供圖片來源與適合列印的解析度。

## 驗證

產出後檢查實際 PDF：中文字形、題號、留白、表格跨頁、圖解與手寫空間。確認沒有空白頁、裁切或答案意外出現在學生版。修改共用樣式時，至少檢查一份較長的既有講義與本頁元件範例；PDF 文字抽取不能取代視覺檢查。
