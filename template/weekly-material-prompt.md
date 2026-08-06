# 每週教材產生提示詞範本（Weekly Material Generation Prompt）

> 用途：每週要請 Claude（或其他 LLM）產生新一週教材時，複製下方「提示詞」區塊，把中括號內容換成實際資訊即可使用。這份文件本身是通用範本，不含任何學生個資。

## 效率原則：週數增加不代表要讀的東西變多

隨著教學進行，`weekly/` 底下會累積越來越多週的完整講義（短文、題目、教學指引），如果每次產生新一週教材前都要把之前每一週的完整檔案打開來看「有沒有教過、有沒有重複」，讀取量會隨週數線性甚至加速成長，非常浪費 token。

解法：**只維護一份輕量的索引檔 `weekly-index.csv`（放在分支根目錄，每學生一份），每次只需要讀這一份索引，不需要打開任何過去週的 `weekly/weekXX/` 完整講義內容。**

- 「哪些文法/單字教過」→ 已經記錄在 `grammar-master.csv`、`vocab-master-2000.csv` 的 `taught`/`week_taught` 欄位，不需要重讀舊講義。
- 「哪些文章主題/情境用過，會不會重複，有沒有可以延伸的梗」→ 記錄在 `weekly-index.csv`，每週只新增一列，內容極短（主題、情境哏、延伸想法），讀 50 週的索引檔也不會比讀 1 份完整講義貴多少。
- 只有在真的需要回顧某一週的完整內容時（例如學生問起、要修改該週講義），才單獨打開該週資料夾，不要在「產生新一週教材」這個例行流程中預設打開舊講義。

`weekly-index.csv` 欄位：`week,date,article_theme,article_hook,grammar_topic,vocab_1200_count,vocab_800_count,extension_idea,status`

- `week`：週次編號（01, 02, ...）
- `date`：實際上課日期，教材產生當下留空，上完課再填
- `article_theme`：本週短文主題（例如「認識新朋友」），一句話即可
- `article_hook`：本週用的情境哏/角色（例如「線上遊戲論壇認識 Kevin」），避免下次又寫成一模一樣的情境
- `grammar_topic`：對照 `grammar-master.csv` 的 topic 欄位
- `vocab_1200_count` / `vocab_800_count`：本週新字各級別各幾個
- `extension_idea`：這週結束時想到、可以留給以後幾週延伸的點子（例如「下週可以讓 Kevin 反問 Jonathan 更多問題，銜接疑問句單元」），下次產生教材時先看這欄有沒有能接上的
- `status`：`planned`（教材已產出、尚未上課）或 `taught`（已上課）

## 產出原則（精神）

1. **對照本 repo 現有資料，不憑空編造**：文法點取自 `grammar-master.csv`（依 `taught` 欄位挑下一個未教的主題，依 semester 順序）；單字取自 `vocab-master-2000.csv`（見下方「單字比例」）；課本實際單元順序對照 `school-syllabus.md`；歷史主題/延伸哏取自 `weekly-index.csv`（只讀這份索引，不讀舊講義全文）。
2. **貼近學生興趣、生活化**：短文/對話情境要貼合 `student-notes.md` 記錄的興趣，語言使用整體自然情境，避免為了塞文法而寫出不自然的句子。同一個情境哏（如某個虛構角色、某個場景）用過後盡量不要立刻重複，可參考 `weekly-index.csv` 的 `extension_idea` 順勢延續（例如同一角色下週再出現、但帶出新的問題/情境），也可以開全新的情境，兩種都可以，重點是不要跟前幾週雷同到像複製貼上。
3. **單字比例：1200 字為主線，800 字是點綴**：
   - 每週新字建議 10-15 個。
   - 其中 **800 進階字最多 2-3 個**（約占 15-20%），且要自然融入文章情境，不要為了塞進階字而寫出生硬句子。
   - 剛開學前幾週（或學生剛接觸新單元時）先從 **0-1 個** 800 字試水溫，確認學生 1200 字基礎穩了之後，再逐步增加到 2-3 個。
   - 800 字優先選跟本週主題/興趣自然相關的詞，而不是隨機挑。
4. **符合會考(CAP)精神**（參考 [國中教育會考英語科說明](https://cap.rcpet.edu.tw/test4-3.html)）：
   - 趣味化、實用化、多元化、生活化；評量內容為基本、核心、重要的概念。
   - 涵蓋日常交談、社交應對、教室用語等一般人際溝通情境。
   - 字彙以基礎 1200 字為主，文法為國中基礎文法句構。
   - 語言使用重視整體自然情境，不是零碎、片斷的記憶。單題可測字彙+語法，但要放在自然語境的句子/短對話中，不要孤立的文法填空。
   - 閱讀理解要涵蓋細節（detail）、推論（inference）、猜字（guessing from context）、主旨（main idea）四種理解層次。
5. **在符合以上精神下，最大自由地貼合學生興趣發揮**：故事、角色、情境可以自由發想（例如遊戲、動漫、運動等），只要語言難度、字彙、文法落在該週目標範圍內。
6. **一次產出三份文件**，各自獨立、用途不同：
   - **學生版講義**（`NN-student-worksheet.md`）：短文/對話 + 生字表 + 閱讀理解題 + 文法練習題 + 一個貼近興趣的口說/寫作延伸練習。**不附答案**。
   - **教師版教學指引**（`NN-teacher-guide.md`）：本週教學目標、對照 `student-notes.md` 的課堂結構（複習/新教材/練習應用時間分配；若是第一週或程度確認週，可調整為「破冰與程度確認」）、教學步驟與提示語、易錯點與教學建議、如何延伸討論學生興趣。
   - **答案與詳解**（`NN-answer-key.md`）：學生版講義所有題目的答案，並附簡短說明（為什麼選這個答案／常見錯誤）。

## 提示詞範本

```
請幫我產生第 [週次] 週的英文家教教材，學生資訊參考 student-notes.md。

查詢進度時，只需讀取以下輕量資料，不要打開過去週的 weekly/weekXX/ 完整講義：
- grammar-master.csv（找 taught=no 的下一個主題）
- vocab-master-2000.csv（找 taught=no 的字）
- weekly-index.csv（看過去每週的主題/情境哏/延伸想法，避免重複、可考慮延續）

本週文法點：取 grammar-master.csv 中 taught=no 的下一個主題（依學期順序）。
本週新單字：取 vocab-master-2000.csv 中 taught=no 的字，共 10-15 個，其中 800 級最多 2-3 個（初期可先 0-1 個），其餘為 1200 級，主題盡量貼合本週文法與學生興趣。
對照 school-syllabus.md 的實際課本單元順序，確認進度合理。
對照 weekly-index.csv，確保本週情境哏不要跟前幾週重複，可延續之前記錄的 extension_idea。

請產生三份 markdown 檔案於 weekly/week[NN]/：
1. [NN]-student-worksheet.md（學生版講義，不附答案）
2. [NN]-teacher-guide.md（教師教學指引）
3. [NN]-answer-key.md（答案與詳解）

內容需符合會考(CAP)精神：生活化、自然語境、涵蓋細節/推論/猜字/主旨四種閱讀理解層次。
在此原則下，盡量貼合學生興趣自由發揮情境與角色。

完成後：
- 三份 markdown 轉成可列印的 PDF。
- 在 weekly-index.csv 新增一列本週紀錄（week/article_theme/article_hook/grammar_topic/vocab_1200_count/vocab_800_count/extension_idea/status=planned，date 留空）。
- 更新 grammar-master.csv、vocab-master-2000.csv 中本週教過項目的 taught/week_taught 欄位（於實際上課後才更新，不要在產生教材當下就標記已教）。
- 依 progress-log.md 格式新增本週紀錄、並把 weekly-index.csv 該列 status 改成 taught、補上 date（於實際上課後才做）。
```

## 檔案輸出位置

```
weekly-index.csv                  ← 每週摘要索引，每次產生新教材前只讀這份
weekly/
  week[NN]/
    [NN]-student-worksheet.md   (+ .pdf，供列印給學生)
    [NN]-teacher-guide.md       (+ .pdf，供教師列印參考)
    [NN]-answer-key.md          (+ .pdf)
```
