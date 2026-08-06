# eng-tutor

國中英文家教教材與學生進度追蹤 repo。設計上通用給任何一位國中生使用，**main branch 不放任何學生個資**，每位學生的實際資料獨立存在各自的分支中。

## 架構

```
main
├── README.md
└── template/
    ├── student-notes.md       # 學生資料/教學提示詞範本
    ├── vocab-master-2000.csv  # 教育部公開 1200+800 常用單字追蹤表
    ├── grammar-master.csv     # 六學期文法框架追蹤表
    ├── school-syllabus.md     # 學校課本大綱對照表
    ├── progress-log.md        # 每週進度紀錄範本
    ├── weekly-material-prompt.md  # 每週教材產生提示詞範本
    ├── weekly-index.csv       # 每週教材摘要索引（避免週數增加時 token 消耗跟著暴增）
    └── weekly/                # 每週講義存放處（空資料夾）

student/<代稱>          # 每位學生一個分支，根目錄下直接放該生的實際資料
```

- **main branch**：只維護共用範本，不含任何學生個資，可安全地公開或分享。
- **student/<代稱> branch**：每位學生獨立一個分支，`template/` 內容會被複製到分支根目錄，`template/` 資料夾本身則刪除。分支上的 `student-notes.md`、`school-syllabus.md`、`progress-log.md` 才會填入該學生的實際資料。

## 開新學生分支流程

```bash
git checkout main
git checkout -b student/<代稱>
```

接著：

1. 把 `template/` 內容複製到根目錄，刪除 `template/` 資料夾本身。
2. 依實際學生資訊填寫 `student-notes.md`（基本資料／程度目標／教學共識／進度摘要／待辦）。
3. 依實際使用的課本版本（康軒／南一／翰林）調整 `school-syllabus.md` 的版本單元對照。
4. 之後每週上課，複製 `progress-log.md` 的區塊格式記錄，並視需要更新 `vocab-master-2000.csv`、`grammar-master.csv` 的 `taught`／`week_taught`／`notes` 欄位。

## 檔案說明

### `vocab-master-2000.csv`

來源為教育部公告之國中小英語文參考詞彙表（1200 基本字 + 800 進階字，共約 2000 字），公開資料，不含任何版權單字書內容。

欄位：`word,part_of_speech,level,taught,week_taught,notes`

### `grammar-master.csv`

通用六學期文法框架（七上～九下），依康軒／南一／翰林等版本實際授課順序可能略有差異，需對照 `school-syllabus.md` 微調使用順序。

欄位：`semester,topic,detail,taught,week_taught,notes`

### `school-syllabus.md`

六學期文法框架總覽，以及各版本（康軒／南一／翰林）單元對照表，供對照學生實際課本進度使用。

### `progress-log.md`

每週上課紀錄範本：複習內容、新文法點、新單字、短文主題、課堂表現、常錯待加強、回家作業、下週預告。

### `weekly-material-prompt.md`

每週產生新教材時使用的提示詞範本與流程說明。核心原則：只讀 `grammar-master.csv`／`vocab-master-2000.csv`／`weekly-index.csv` 這幾份輕量資料來決定本週內容，**不需要打開過去每一週 `weekly/weekXX/` 的完整講義**，避免週數越多、產生新教材要讀的東西越多、token 消耗跟著加速成長。也定義了每週新字的 1200/800 級比例（1200 為主線，800 進階字每週最多 2-3 個，初期更少）。

### `weekly-index.csv`

每週教材的極簡摘要索引（一週一列）：主題、情境哏、對照的文法點、新字級別數量、可延伸的想法、狀態（planned/taught）。產生新一週教材前先讀這份索引即可掌握前面教過什麼、用過什麼情境，不用整份翻舊講義。

欄位：`week,date,article_theme,article_hook,grammar_topic,vocab_1200_count,vocab_800_count,extension_idea,status`

### `weekly/`

存放每週實際使用的講義檔案（短文、練習題等），依 `weekly-material-prompt.md` 的流程產生。

## 個資保護原則

- **main branch 絕不 commit 任何學生真實姓名、聯絡方式或其他個資。**
- 各學生分支僅在本機或私人環境使用，若要分享／備份到遠端，請確認遠端 repo 為私有（private）。
