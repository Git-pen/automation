---
name: Skill Creator
description: Meta-skill that auto-generates new diagram architect skills when a requested diagram type has no existing skill.
---
# Skill: Skill Creator (Meta-Skill)

**Objective:** You are a Skill Factory. When the user requests a UML diagram type for which no existing skill file exists in `.agent/skills/`, your job is to **create the skill first**, then **immediately execute it** to produce the diagram and report.

**Trigger Condition:**
Before executing any diagram request, check the `.agent/skills/` directory. If no skill file matches the requested diagram type (e.g., the user asks for a "State Diagram" but no `state_architect.md` exists), execute this skill to create one before proceeding.

**Execution Protocol:**

1. **Skill Gap Detection:**
   - List all files in `.agent/skills/` to identify existing diagram skills.
   - Compare the user's requested diagram type against the existing skills.
   - If a matching skill already exists, load and execute it instead — do NOT create a duplicate.

2. **Skill Generation (Follow This Template Exactly):**
   - Create a new file at `.agent/skills/<diagram_type>_architect.md` using the **exact structure** below.
   - All generated skills MUST comply with the rules in `.agent/rules.md` — read it first.

   **Required Skill Structure:**
   ```markdown
   ---
   name: <Diagram Type> Diagram Architect
   description: Generate strict, professional-grade UML <Diagram Type> Diagrams based on a provided scenario.
   ---
   # Skill: <Diagram Type> Diagram Architect

   **Objective:** You are an expert Software Architect. Your task is to generate strict, professional-grade UML <Diagram Type> Diagrams to model <what this diagram models> based on a provided scenario.

   **Execution Protocol:**
   Execute sequentially. Do not ask for intermediate confirmation.

   1. **Context Ingestion:** - Read the scenario from the SDA Lab Manual by running `node scripts/read_pdf.js <experiment_number>` (Experiment <N> — <Topic>). If the user specifies a different experiment, use that number instead. If the user provides their own scenario directly in the prompt, use that scenario instead of reading from the lab manual.
      - <Diagram-specific analysis instructions: what to extract from the scenario>
   2. **PlantUML Generation (CRITICAL STYLING):**
      - Formulate error-free PlantUML syntax for a <diagram type> diagram.
      - **Anti-Squish & Readability Styling:** You MUST inject these parameters at the very top of your PlantUML code:
        ```plantuml
        <Diagram-appropriate skinparam settings>
        skinparam defaultTextAlignment center
        ```
      - Syntax standard: <Diagram-specific PlantUML syntax rules and arrow conventions>
   3. **Execution:** - Call the `generate_plantuml_diagram` tool.
      - Set `output_path` to `diagrams/<diagram_type>_architecture.png`.
      - Set `format` to `png`.
   4. **Error Correction:** Auto-fix any syntax errors returned by the MCP server until the PNG is successfully generated.
   5. **Report Compilation & Conversion:**
      - Rule 1: Compile the final analysis as a Markdown file and save it strictly as `reports/<DiagramType>_Report.md`.
      - Rule 2: Execute `node scripts/md_to_docx.js reports/<DiagramType>_Report.md wordReports/<DiagramType>_Report.docx` to generate the Word Report.

   **Required Report Structure (`reports/<DiagramType>_Report.md`):**
   # <Report Title>

   ## <Analysis Section 1>
   *<What to document about the diagram's primary elements>*

   ## <Analysis Section 2>
   *<What to document about relationships/flows/interactions>*

   ## <Diagram Type> Diagram
   ![<Diagram Type> Diagram](../diagrams/<diagram_type>_architecture.png)
   ```

   **Mapping of diagram types to experiment numbers** (use when the user doesn't specify):
   | Diagram Type | Experiment | skinparam Essentials |
   |---|---|---|
   | Use Case | 3 | `left to right direction` |
   | Component | 5 | `skinparam componentStyle uml2`, `skinparam linetype ortho` |
   | Class | 6 | `skinparam linetype ortho`, `skinparam classAttributeIconSize 0` |
   | Sequence | 7 | `skinparam maxMessageSize 150`, `skinparam ParticipantPadding 40` |
   | Activity | 8 | `skinparam ActivityDiamondFontSize 14` |
   | Deployment | 9 | `left to right direction`, `skinparam linetype ortho` |
   | Package | 10 | `skinparam linetype ortho`, `skinparam packageStyle rectangle` |
   | State | N/A | `skinparam linetype ortho`, `hide empty description` |
   | Object | N/A | `skinparam linetype ortho`, `skinparam objectAttributeIconSize 0` |
   | Communication | N/A | `skinparam linetype ortho` |

   For diagram types not in this table, choose appropriate skinparam settings based on PlantUML best practices.

3. **Immediate Execution:**
   - After creating the skill file, **immediately load and execute it** against the user's scenario.
   - Do NOT stop after creating the skill — the user expects the diagram and report as output, not just the skill file.
