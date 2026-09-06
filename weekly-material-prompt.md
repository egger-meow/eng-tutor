# 每週教材產生提示詞範本（Weekly Material Generation Prompt）

> 用途：每週要請 Claude（或其他 LLM）產生新一週教材時，複製下方「提示詞」區塊，把中括號內容換成實際資訊即可使用。這份文件本身是通用範本，不含任何學生個資。

## 效率原則：週數增加不代表要讀的東西變多

隨著教學進行，`weekly/` 底下會累積越來越多週的完整講義（短文、題目、教學指引），如果每次產生新一週教材前都要把之前每一週的完整檔案打開來看「有沒有教過、有沒有重複」，讀取量會隨週數線性甚至加速成長，非常浪費 token。

解法：**只維護一份輕量的索引檔 `weekly-index.csv`（放在分支根目錄，每學生一份），每次只需要讀這一份索引，不需要打開任何過去週的 `weekly/weekXX/` 完整講義內容。**

- 「哪些文法/單字教過」→ 已經記錄在 `grammar-master.csv`、`vocab-master-2000.csv` 的 `taught`/`week_taught` 欄位，不需要重讀舊講義。
- 「哪些文章主題/情境用過，會不會重複、有沒有可以延伸的梗」→ 記錄在 `weekly-index.csv`，每週只新增一列，內容極短。
- 只有在真的需要回顧某一週完整內容時，才單獨打開該週資料夾，不要在例行產生流程中預設重讀舊講義。

`weekly-index.csv` 欄位：`week,date,article_theme,article_hook,grammar_topic,vocab_1200_count,vocab_800_count,extension_idea,status`

- `week`：週次編號（01, 02, ...）
- `date`：實際上課日期，教材產生當下留空，上完課再填
- `article_theme`：本週短文主題，一句話即可
- `article_hook`：本週用的情境哏/角色，避免下次重複
- `grammar_topic`：對照 `grammar-master.csv` 的 topic 欄位
- `vocab_1200_count` / `vocab_800_count`：本週新字各級別各幾個
- `extension_idea`：留給後續幾週的延伸點子，也可記錄實際難度觀察
- `status`：`planned` 或 `taught`

## 產出原則（精神）

1. **對照本 repo 現有資料，不憑空編造**：文法點取自 `grammar-master.csv`；單字取自 `vocab-master-2000.csv`；課本順序對照 `school-syllabus.md`；歷史主題/延伸哏取自 `weekly-index.csv`。
2. **貼近學生興趣、生活化**：短文/對話要貼合 `student-notes.md` 的興趣與程度，避免為了塞文法寫出不自然句子；情境可延續也可換新，但不要像複製貼上。
3. **單字以學習價值與實際程度為準，不做突然的整級跳升**：
   - 每篇選 **7-15 個真正值得學的核心單字**，不硬湊數量。
   - 先讀 `student-notes.md` 的實際程度校準、`vocab-master-2000.csv` 的 taught 狀態，以及 `weekly-index.csv` 最近紀錄的實際難度觀察。
   - **預設以 1200 級高頻字為主，800 級逐步加入。不要因為某週表現不錯，就下一週突然把整組核心字全面升到 800 級。**
   - 若最近一堂實際只卡少數幾個字，下一週優先維持相近的「真正新字負荷」，連續數週明顯太簡單再逐步升高。
   - 已確認掌握的字可自然出現，但不列入正式 vocabulary 額度。
   - 主題必要且實用的字可少量列為延伸字；不為了增加數量塞冷僻字。
4. **文章的難度上限就是本週核心單字（Strict Vocabulary Ceiling & Zero Tolerance for Hidden Advanced Words）**：
   - 正文、題目、選項、例句、口說與 Homework 中最難的字，必須限於本週核心單字。
   - 其餘非核心用字使用學生已掌握的基礎常用字。
   - 禁止暗藏未列入生字表的中進階字。必要概念要嘛升格為核心字，要嘛改寫成最簡單英文。
   - 產出前逐句掃描全文與題目選項，凡不在核心字表、又不是基礎字者，立即簡化。
   - 一般猜字題仍只能以核心單字為目標。
5. **Reading 不是文字牆**：
   - 一篇較長閱讀預設切成 **3-5 個短 scene / beat**，每段有短而自然的小標，不要連續堆一整頁同尺寸段落。
   - 在真的有助理解時，加入一個 compact 的 `Before / After`、decision box、quote、mini-table 或短 callout，把故事轉折視覺化；不要為裝飾而亂塞框。
   - 學生應該可以快速看出「現在讀到哪個事件、問題、決定、結果」。
6. **發音教學以「看字敢念」為目標，不以 IPA 為目標**：
   - Student Handout **預設禁止 IPA 與專業音標符號**，除非 `student-notes.md` 明確寫學生正在學 IPA。
   - 改用一般英文字母的易讀拆法、**大寫表示重音**（例如 `a-BOUT`）、繁中嘴型/舌頭動作，以及「台灣學生最容易錯哪裡」。一次只講一個清楚動作。
   - 若安排 pronunciation practice，必須包含 **2-5 個老師尚未示範過的 common / decodable words** 做 transfer check。老師先不要念，讓學生先套剛教的規則試讀。
   - 這些 transfer words 是 pronunciation-only 小測，不教意思、不列入本週核心單字，也不得跑去 Reading / Grammar / Homework 當隱藏生字。Teacher Guide / Answer Key 要標出每字測哪一條發音規則。
7. **符合會考(CAP)精神**：趣味化、實用化、多元化、生活化；閱讀理解涵蓋 detail、inference、guessing from context、main idea；文法放進自然語境，不做一整頁碎片式死背。
8. **在以上限制內最大自由貼合學生興趣**：故事、角色與情境可自由發揮，只要難度與文法落在本週目標。
9. **一次產出三份文件**：
   - **學生版講義**（`01-student-worksheet.md`）：完整 reading + 核心單字 + comprehension + 可直接教的 grammar pattern / 快速判斷 / 混淆比較 + grammar practice + 視需要加入 pronunciation lab + speaking + Homework。學生版不附答案。
   - **教師版教學指引**（`02-teacher-guide.md`）：課前快速掃過的 cheat sheet，只保留流程、做法、卡點、pronunciation transfer 的觀察方式與必要補充。
   - **答案與詳解**（`03-answer-key.md`）：學生版所有題目完整答案，含 pronunciation transfer 的規則說明與 Homework 答案。
10. **Homework 從 Week 2 起固定加入**：以本週核心單字為範圍做 retrieval practice，不重新教單字，也不突然提高難度。Pronunciation transfer words 不進 Vocabulary Homework。
11. **PDF 只輸出學生講義**：Student Handout 產生 Markdown + PDF；Teacher Guide 與 Answer Key 僅 Markdown。Student PDF 必須包含最後的 Homework。

## 提示詞範本

```
請幫我產生第 [週次] 週的英文家教教材，學生資訊參考 student-notes.md。

查詢進度時，只需讀取以下輕量資料，不要打開過去週的 weekly/weekXX/ 完整講義：
- grammar-master.csv（找 taught=no 的下一個主題）
- vocab-master-2000.csv（找 taught=no 的字）
- weekly-index.csv（看過去每週的主題/情境哏/延伸想法，以及最近的實際難度觀察）

本週文法點：取 grammar-master.csv 中 taught=no 的下一個主題（依學期順序）。
本週核心單字：依 student-notes.md 的實際程度，從 vocab-master-2000.csv 中 taught=no 的字選 7-15 個真正有學習價值的常用字。預設以 1200 級為主、800 級漸進加入，不得無依據整批升級難度。已掌握基礎字不計額度。
對照 school-syllabus.md 的課本順序與 weekly-index.csv 的歷史情境，避免重複。

請產生三份 markdown 檔案於 weekly/week[NN]/：
1. 01-student-worksheet.md
2. 02-teacher-guide.md
3. 03-answer-key.md

內容需符合 CAP 精神與 strict vocabulary ceiling。Reading 請切成 3-5 個易掃讀的故事節點，必要時用一個 mini-table / decision box / callout 呈現轉折，不要做成整頁文字牆。

若本週有 pronunciation teaching：Student Handout 不使用 IPA 或專業音標；用一般字母易讀拆法、重音大寫、繁中口腔動作與常見錯誤。加入 2-5 個老師尚未示範過的 common / decodable words 做 pronunciation-only transfer check，老師先不要念，讓學生先試；這些字不算核心單字，也不可跑進其他題型當隱藏生字。

學生講義加入可直接教的 grammar pattern、快速判斷、適量練習與 Homework；教師指引保持精簡；答案檔包含所有題目與 pronunciation transfer 的判讀重點。

完成後：
- 只把學生講義 markdown 轉成可列印 PDF，確認 Homework 在最後。
- 在 weekly-index.csv 新增本週紀錄，date 留空，status=planned。
- 不要在產生教材當下把 grammar-master.csv 或 vocab-master-2000.csv 標記為 taught；實際上課後才更新。
- 實際上課後再依 progress-log.md 新增紀錄，並補 weekly-index.csv 的 date / status / 實際難度觀察。
```

## 檔案輸出位置

```
weekly-index.csv
weekly/
  week[NN]/
    01-student-worksheet.md   (+ .pdf，含 Homework，供列印給學生)
    02-teacher-guide.md       (Markdown only)
    03-answer-key.md          (Markdown only)
```
