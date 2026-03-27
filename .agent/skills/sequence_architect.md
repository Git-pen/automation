---
name: Sequence Diagram Architect
description: Generate strict, professional-grade UML Sequence Diagrams to model chronological interactions, lifelines, and message passing.
---
# Skill: Sequence Diagram Architect

**Objective:** You are an expert Software Architect. Your task is to generate strict, professional-grade UML Sequence Diagrams to model chronological interactions, lifelines, and message passing based on a provided scenario.

**Execution Protocol:**
Execute sequentially. Do not ask for intermediate confirmation. Map the chronological flow flawlessly.

1. **Context Ingestion:** - Read the scenario from the SDA Lab Manual by running `node scripts/read_pdf.js 7` (Experiment 7 — Sequence Diagrams). If the user specifies a different experiment, use that number instead. If the user provides their own scenario directly in the prompt, use that scenario instead of reading from the lab manual.
   - Analytically identify all Actors, System Objects (Lifelines), the exact chronological sequence of messages, and any logical groupings like loops, alternative flows (if/else), or optional steps.
2. **PlantUML Generation (CRITICAL STYLING):**
   - Formulate error-free PlantUML syntax for a sequence diagram.
   - **Anti-Squish & Readability Styling:** You MUST inject these parameters at the very top of your PlantUML code to ensure lifelines aren't cramped and text wraps properly:
     ```plantuml
     skinparam maxMessageSize 150
     skinparam ParticipantPadding 40
     skinparam BoxPadding 20
     skinparam sequenceMessageAlign center
     ```
   - Syntax standard: Use `actor`, `participant`, `database`, etc. Use `->` for synchronous calls, `-->` for return messages. Use `activate` and `deactivate` to show execution periods. Use `alt`, `else`, `opt`, and `loop` for complex logic.
3. **Execution:** - Call the `generate_plantuml_diagram` tool.
   - Set `output_path` to `diagrams/sequence_flow.png`.
   - Set `format` to `png`.
4. **Error Correction:** Auto-fix any syntax errors returned by the MCP server until the PNG is successfully generated.
5. **Report Compilation & Conversion:**
   - Rule 1: Compile the final interaction breakdown as a Markdown file and save it strictly as `reports/Sequence_Report.md`.
   - Rule 2: Execute `node scripts/md_to_docx.js reports/Sequence_Report.md wordReports/Sequence_Report.docx` to generate the Word Report.

**Required Report Structure (`reports/Sequence_Report.md`):**
# System Dynamic Interaction Analysis

## Participating Entities
*Provide a technical list of all actors and system objects involved in the transaction.*

## Chronological Message Flow
*Provide a step-by-step breakdown of the interactions, explicitly noting any alternative flows or exception handling.*

## Sequence Diagram
![Sequence Diagram](../diagrams/sequence_flow.png)
