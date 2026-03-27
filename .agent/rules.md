# Project Rules — SDA Automation

These rules apply to **all skills and all generated outputs** in this project.

## PDF Reading (Strict Protocol)
- **NEVER** use the browser agent, `vscode-pdf`, or any visual tool to read PDFs.
- The SDA Lab Manual has been **pre-indexed** into per-experiment text files in the `lab_manual/` directory.
- To read a specific experiment, run:
  `node scripts/read_pdf.js <experiment_number>`
  Example: `node scripts/read_pdf.js 5` → outputs only Experiment 5 content.
- To read the full manual (rare, fallback only):
  `node scripts/read_pdf.js full`
- If `lab_manual/` does not exist, run the indexer first:
  `node scripts/index_lab_manual.js`

## Skill Design Rules (Apply When Creating New Skills)

1. Every skill's **Context Ingestion** step **MUST** support three input modes:
   - **Default**: Read from the lab manual via `node scripts/read_pdf.js <experiment_number>`.
   - **Custom experiment**: If the user specifies a different experiment number, use that number.
   - **Custom scenario**: If the user provides their own scenario directly in the prompt, use that scenario instead of reading from the lab manual.
2. Skills must **never** be hardcoded to only accept lab manual input.
3. If a user requests a diagram type with **no matching skill** in `.agent/skills/`, load the `skill_creator` meta-skill (`.agent/skills/skill_creator.md`) to auto-generate the missing skill and immediately execute it.

## Report Output Rules

1. **Markdown Reports** must always be saved in the `reports/` folder.
2. **Word Reports** must always be generated from the markdown report and saved in the `wordReports/` folder.
3. After any skill generates a markdown report, it must also convert it to `.docx` format using the `scripts/md_to_docx.js` utility script.
4. Diagrams remain in the `diagrams/` folder and are embedded in both the markdown and Word reports.

## Conversion Workflow

After creating any `reports/<ReportName>.md`, run:
```
node scripts/md_to_docx.js reports/<ReportName>.md wordReports/<ReportName>.docx
```
