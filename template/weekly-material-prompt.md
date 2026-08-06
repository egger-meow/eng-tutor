# 每週教材產生提示詞範本（Weekly Material Generation Prompt）

> 用途：每週要請 Claude（或其他 LLM）產生新一週教材時，複製下方「提示詞」區塊，把中括號內容換成實際資訊即可使用。這份文件本身是通用範本，不含任何學生個資。

## 產出原則（精神）

1. **對照本 repo 現有資料，不憑空編造**：文法點取自 `grammar-master.csv`（依 `taught` 欄位挑下一個未教的主題，依 semester 順序）；單字取自 `vocab-master-2000.csv`（優先挑 `level=1200` 且未教過的字，主題貼合當週文法與學生興趣）；課本實際單元順序對照 `school-syllabus.md`。
2. **貼近學生興趣、生活化**：短文/對話情境要貼合 `student-notes.md` 記錄的興趣，語言使用整體自然情境，避免為了塞文法而寫出不自然的句子。
3. **符合會考(CAP)精神**（參考 [國中教育會考英語科說明](https://cap.rcpet.edu.tw/test4-3.html)）：
   - 趣味化、實用化、多元化、生活化；評量內容為基本、核心、重要的概念。
   - 涵蓋日常交談、社交應對、教室用語等一般人際溝通情境。
   - 字彙以基礎 1200 字為主，文法為國中基礎文法句構。
   - 語言使用重視整體自然情境，不是零碎、片斷的記憶。單題可測字彙+語法，但要放在自然語境的句子/短對話中，不要孤立的文法填空。
   - 閱讀理解要涵蓋細節（detail）、推論（inference）、猜字（guessing from context）、主旨（main idea）四種理解層次。
4. **在符合以上精神下，最大自由地貼合學生興趣發揮**：故事、角色、情境可以自由發想（例如遊戲、動漫、運動等），只要語言難度、字彙、文法落在該週目標範圍內。
5. **一次產出三份文件**，各自獨立、用途不同：
   - **學生版講義**（`NN-student-worksheet.md`）：短文/對話 + 生字表 + 閱讀理解題 + 文法練習題 + 一個貼近興趣的口說/寫作延伸練習。**不附答案**。
   - **教師版教學指引**（`NN-teacher-guide.md`）：本週教學目標、對照 `student-notes.md` 的課堂結構（複習/新教材/練習應用時間分配；若是第一週或程度確認週，可調整為「破冰與程度確認」）、教學步驟與提示語、易錯點與教學建議、如何延伸討論學生興趣。
   - **答案與詳解**（`NN-answer-key.md`）：學生版講義所有題目的答案，並附簡短說明（為什麼選這個答案／常見錯誤）。

## 提示詞範本

```
請幫我產生第 [週次] 週的英文家教教材，學生資訊參考 student-notes.md。

本週文法點：取 grammar-master.csv 中 taught=no 的下一個主題（依學期順序）。
本週新單字：取 vocab-master-2000.csv 中 taught=no、level=1200 優先，約 10-15 個，主題盡量貼合本週文法與學生興趣。
對照 school-syllabus.md 的實際課本單元順序，確認進度合理。

請產生三份 markdown 檔案於 weekly/week[NN]/：
1. [NN]-student-worksheet.md（學生版講義，不附答案）
2. [NN]-teacher-guide.md（教師教學指引）
3. [NN]-answer-key.md（答案與詳解）

內容需符合會考(CAP)精神：生活化、自然語境、涵蓋細節/推論/猜字/主旨四種閱讀理解層次，字彙以1200字為主。
在此原則下，盡量貼合學生興趣自由發揮情境與角色。

完成後：
- 三份 markdown 轉成可列印的 PDF。
- 更新 grammar-master.csv、vocab-master-2000.csv 中本週教過項目的 taught/week_taught 欄位（於實際上課後才更新，不要在產生教材當下就標記已教）。
- 依 progress-log.md 格式新增本週紀錄（於實際上課後填寫）。
```

## 檔案輸出位置

```
weekly/
  week[NN]/
    [NN]-student-worksheet.md   (+ .pdf，供列印給學生)
    [NN]-teacher-guide.md       (+ .pdf，供教師列印參考)
    [NN]-answer-key.md          (+ .pdf)
```
