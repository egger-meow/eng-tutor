# Repository Guidelines

## Project Structure & Module Organization

This repository is a reusable English-tutoring curriculum template. Repository-root files hold the source material and learner state:

- `student-notes.md` records the learner profile and learning needs.
- `school-syllabus.md` maps the school curriculum.
- `progress-log.md` captures weekly outcomes and next steps.
- `vocab-master-2000.csv` and `grammar-master.csv` track taught content.
- `weekly-index.csv` plans the weekly sequence, while `weekly/weekXX/` contains generated material for a given week.
- `weekly-material-prompt.md` is the canonical prompt for creating weekly materials.

Keep the template content on `main`. Create a separate `student/<name>` branch for each learner and adapt the root files there.

## Build, Test, and Development Commands

This is a documentation-and-data repository; it has no build system or automated test suite. Use Git to prepare a student workspace:

```bash
git checkout main
git checkout -b student/<name>
git status
```

Before committing, review Markdown changes for clarity and inspect CSV files for valid headers, commas, and consistent row values. Use the instructions in `weekly-material-prompt.md` when generating a new `weekly/weekXX/` package.

## Coding Style & Naming Conventions

Write concise Markdown with descriptive headings and fenced code blocks for examples. Preserve the existing CSV column order and header spelling. Use lowercase, hyphenated filenames; name weekly folders `week01`, `week02`, and so on. Record Boolean-style tracking fields consistently (for example, `taught`) and use the relevant week number in `week_taught`.

## Testing Guidelines

Manually validate all curriculum updates. Confirm that new weekly material matches the selected grammar topic and vocabulary counts in `weekly-index.csv`, then update `progress-log.md` and the matching vocabulary/grammar rows. Do not mark material as taught until it has actually been delivered.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commit subjects, such as `Add weekly-index.csv to keep weekly material generation token-cost flat`. Follow that pattern: start with a verb, name the affected artifact, and keep the subject focused.

For pull requests, explain the learner or template impact, list modified curriculum/data files, link any relevant issue, and include a short sample or screenshot when changing generated weekly materials. Keep student-specific information private and do not merge it into `main`.
