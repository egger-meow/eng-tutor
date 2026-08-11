# Week 2 Materials and Vocabulary Calibration Design

## Goal

Recalibrate the curriculum to Jonathan's demonstrated level, preserve the established weekly lesson structure, and deliver a complete Week 2 Minecraft/Notch package whose only PDF output is the printable student handout.

## Curriculum Decision

Week 2 will teach the complete `5W1H` question-word set: `Who / What / Where / When / Why / How`. Although `grammar-master.csv` lists nouns and articles immediately after the broad present-tense row, the Week 1 teacher guide and `weekly-index.csv` explicitly preview question words for the next lesson, while `school-syllabus.md` defines that unit as the broader `What / Who / Where / When / How` sequence. The Week 1 preview is therefore treated as examples rather than a three-word limit, and `Why` is included to complete the practical 5W1H set. The master grammar sequence will remain intact; generating Week 2 material will not mark its grammar as taught before the lesson occurs.

## Learner and Vocabulary Calibration

- Update the learner profile to record that Jonathan's practical reading level is higher than first estimated.
- Treat `student`, `class`, `friend`, `family`, `game`, `play`, `watch`, `like`, `favorite`, `weekend`, `fun`, `cool`, `new`, and `busy` as confirmed mastered vocabulary so generators do not reuse them as formal learning targets.
- Keep `brave` as a genuine learning target rather than marking it mastered.
- Record `episode` as a genuine learning target even though it is not currently present in the 2,000-word master CSV. It may be tracked as a documented extension word without pretending it belongs to the official list.
- Revise generation guidance so each article normally identifies 7–15 useful core words. Selection starts around the demonstrated `brave` / `episode` level, stays common and practical, and does not count already-mastered elementary words merely to fill a quota.
- Articles should remain natural, readable stories. Vocabulary selection measures learning value; it does not force every sentence to become harder.

## Week 2 Package

Create the existing three-file package under `weekly/week02/`:

1. `01-student-worksheet.md`: a cohesive story titled “How Minecraft Was Created,” following Markus “Notch” Persson from his early interest in programming through Minecraft's early player feedback and worldwide growth.
2. `02-teacher-guide.md`: a concise pre-class cheat sheet covering lesson flow, attention points, likely difficulties, and brief teaching cues.
3. `03-answer-key.md`: complete answers and short explanations for all closed exercises, including homework.

The story will avoid deep technical detail and encyclopedia-style exposition. It will use 5W1H naturally and feature 7–15 core words chosen from the tracked common vocabulary where possible.

## Student Handout Flow

The handout will preserve the existing Week 1 structure while extending it to support teaching directly from the page:

1. Reading: the Minecraft creation story
2. Core vocabulary
3. Reading comprehension covering main idea, detail, inference, and context clues
4. Grammar explanation for `Who / What / Where`
5. Student-facing pattern tips, rapid recognition cues, and a short confusion comparison
6. Grammar practice
7. Speaking or interaction activity
8. Homework vocabulary review quiz

The grammar tips will be memorable observations rather than reworded formal definitions. The homework will mix meaning recognition, matching, contextual fill-ins, and limited translation to create retrieval practice without a sudden difficulty jump.

## Teacher Guide

The guide will be short enough to scan before class. It will not duplicate the full student explanation. Any teaching tips retained there will be terse prompts pointing the teacher to the student-facing patterns and the most likely confusion points.

## Tracking and Generation Updates

- Add Week 2 to `weekly-index.csv` with the Minecraft story, `Who / What / Where` grammar, actual vocabulary counts, an extension idea, and `planned` status.
- Do not mark Week 2 grammar or vocabulary as taught before delivery.
- Update `weekly-material-prompt.md` to encode the recalibrated vocabulary rules, student-first grammar tips, concise teacher guide, required homework, and Markdown/PDF output policy.
- Update repository documentation wherever it says all three artifacts receive PDFs.
- Update Week 1 learner/vocabulary tracking based on the actual lesson feedback without falsely marking `brave` or `episode` mastered.

## PDF Policy

- Student handout: Markdown and PDF.
- Teacher guide: Markdown only.
- Answer key: Markdown only.

The Week 2 student PDF must include homework at the end. No Week 2 HTML/PDF derivatives will be produced for the teacher guide or answer key. Existing Week 1 files will remain historical artifacts unless a documentation reference needs correction.

## Validation

- Check all modified Markdown for structure, clarity, and consistency with the design.
- Validate CSV headers, column counts, week numbering, vocabulary counts, and tracking states.
- Confirm every Week 2 core vocabulary item appears naturally in the article or exercises and every homework question is answered in the answer key.
- Generate the student-handout PDF, render it to page images, and visually inspect every page for clipping, broken tables, missing characters, and the presence of homework.
- Confirm no Week 2 teacher-guide or answer-key PDF/HTML is generated.
- Review `git diff` and repository status, then commit and push the completed coherent change to the current upstream branch.
