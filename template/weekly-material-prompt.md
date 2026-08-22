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
3. **單字以學習價值為準，不以年級標籤壓低難度**：
   - 每篇文章選 **7-15 個真正值得學的核心單字**；不需硬湊固定數量，也不可把已掌握的基礎字拿來充數。
   - 先讀 `student-notes.md` 的實際程度校準與 `vocab-master-2000.csv` 的 `taught` 狀態。已確認掌握的字可自然出現在文章中，但不列入正式 vocabulary 額度。
   - 原則上從常見 2,000 字範圍選擇；主題必要且實用的字可少量列為「延伸字」，並明確註記。
   - 不為了增加數量塞冷僻字，也不為了年級標籤刻意選太簡單的字。
4. **文章的難度上限就是本週核心單字（Strict Vocabulary Ceiling & Zero Tolerance for Hidden Advanced Words）**：
   - **絕對難度天花板**：正文、題目、選項、例句、口說與 Homework 中出現的最難單字，**必須且只能是**本週列出的 7-15 個核心單字。
   - **其餘非核心用字必須是基礎常用字**：除專有名詞外，其他敘事用字必須是學生已確認掌握的國小基礎字或高頻基礎字（如 `man`, `home`, `water`, `help`, `see`, `door`）。
   - **零容忍暗藏超綱難字**：嚴格禁止在文章或題目中偷偷使用未列入生字表的中進階單字（例如 `demonstration`, `suspicious`, `apprentice`, `herbal`, `jealous`, `sacred`, `shrine`, `unarmed`, `desire` 等）。
   - **遇必要情境時的唯二處理方式**：
     - (a) 若該字對情境不可或缺，**必須直接升格列入當週核心生字表**（佔額度並提供中文與例句）；
     - (b) 否則**必須徹底改寫為最簡單的基礎英文**（例：用 `show` 代替 `demonstration`；用 `bad stranger` 代替 `suspicious stranger`；用 `student` 代替 `apprentice`；用 `without weapons` 代替 `unarmed`）。
   - **產出前強制逐字掃描**：產出前必須逐句掃描全文與題目選項，凡是不在核心單字表、又非學生已掌握的基礎字，一律立即替換為簡單字。猜字題也只能以核心單字為目標出題。
5. **符合會考(CAP)精神**（參考 [國中教育會考英語科說明](https://cap.rcpet.edu.tw/test4-3.html)）：
   - 趣味化、實用化、多元化、生活化；評量內容為基本、核心、重要的概念。
   - 涵蓋日常交談、社交應對、教室用語等一般人際溝通情境。
   - 字彙以基礎 1200 字為主，文法為國中基礎文法句構。
   - 語言使用重視整體自然情境，不是零碎、片斷的記憶。單題可測字彙+語法，但要放在自然語境的句子/短對話中，不要孤立的文法填空。
   - 閱讀理解要涵蓋細節（detail）、推論（inference）、猜字（guessing from context）、主旨（main idea）四種理解層次。
6. **在符合以上精神下，最大自由地貼合學生興趣發揮**：故事、角色、情境可以自由發想（例如遊戲、動漫、運動等），只要語言難度、字彙、文法落在該週目標範圍內。
7. **一次產出三份文件**，各自獨立、用途不同：
   - **學生版講義**（`NN-student-worksheet.md`）：完整文章 + 生字表 + 閱讀理解 + 文法規則與真正好記的 pattern／快速判斷／混淆比較 + 文法練習 + 口說互動 + Homework vocabulary review quiz。課堂應能直接沿著這份講義教到底。**不附答案**。
   - **教師版教學指引**（`NN-teacher-guide.md`）：課前幾分鐘快速掃過的 cheat sheet，只保留流程、各段做法、提醒、可能卡點與必要補充；Teaching Tips 短而重點式，不重複學生講義的完整內容。
   - **答案與詳解**（`NN-answer-key.md`）：學生版所有題目及 Homework 的完整答案，附必要的短說明。
8. **Homework 從 Week 2 起固定加入**：以本週 7-15 個核心單字為範圍，混合意思選擇、matching、context fill-in、簡單選字與適量翻譯。目標是數天後的 retrieval practice，不重新教單字，也不突然提高難度。
9. **PDF 只輸出學生講義**：Student Handout 產生 Markdown + PDF；Teacher Guide 與 Answer Key 僅產生 Markdown。Student PDF 必須包含最後的 Homework。

## 提示詞範本

```
請幫我產生第 [週次] 週的英文家教教材，學生資訊參考 student-notes.md。

查詢進度時，只需讀取以下輕量資料，不要打開過去週的 weekly/weekXX/ 完整講義：
- grammar-master.csv（找 taught=no 的下一個主題）
- vocab-master-2000.csv（找 taught=no 的字）
- weekly-index.csv（看過去每週的主題/情境哏/延伸想法，避免重複、可考慮延續）

本週文法點：取 grammar-master.csv 中 taught=no 的下一個主題（依學期順序）。
本週核心單字：依 student-notes.md 的實際程度，從 vocab-master-2000.csv 中 taught=no 的字選 7-15 個真正有學習價值的常用字；已掌握的基礎字不計額度。必要時可少量加入主題相關的實用延伸字並註記。
對照 school-syllabus.md 的實際課本單元順序，確認進度合理。
對照 weekly-index.csv，確保本週情境哏不要跟前幾週重複，可延續之前記錄的 extension_idea。

請產生三份 markdown 檔案於 weekly/week[NN]/：
1. [NN]-student-worksheet.md（學生版講義，不附答案）
2. [NN]-teacher-guide.md（教師教學指引）
3. [NN]-answer-key.md（答案與詳解）

內容需符合會考(CAP)精神：生活化、自然語境、涵蓋細節/推論/猜字/主旨四種閱讀理解層次。文章、題目與例句中最難的字必須限於本週核心單字；不可暗藏更難的非核心字。學生講義加入可直接教的 grammar pattern／快速判斷與 Homework，教師指引保持精簡，答案檔包含 Homework 完整答案。
在此原則下，盡量貼合學生興趣自由發揮情境與角色。

完成後：
- 只把學生講義 markdown 轉成可列印的 PDF，並確認 Homework 包含在最後；Teacher Guide 與 Answer Key 不產生 PDF/HTML。
- 在 weekly-index.csv 新增一列本週紀錄（week/article_theme/article_hook/grammar_topic/vocab_1200_count/vocab_800_count/extension_idea/status=planned，date 留空）。
- 更新 grammar-master.csv、vocab-master-2000.csv 中本週教過項目的 taught/week_taught 欄位（於實際上課後才更新，不要在產生教材當下就標記已教）。
- 依 progress-log.md 格式新增本週紀錄、並把 weekly-index.csv 該列 status 改成 taught、補上 date（於實際上課後才做）。
```

## 檔案輸出位置

```
weekly-index.csv                  ← 每週摘要索引，每次產生新教材前只讀這份
weekly/
  week[NN]/
    [NN]-student-worksheet.md   (+ .pdf，含 Homework，供列印給學生)
    [NN]-teacher-guide.md       (Markdown only)
    [NN]-answer-key.md          (Markdown only)
```
