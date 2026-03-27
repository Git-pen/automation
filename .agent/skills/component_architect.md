---
name: Component Diagram Architect
description: Generate strict, beautifully routed UML Component Diagrams to model system modularity and inter-module data flow.
---
# Skill: Component Diagram Architect (Modular Design)

**Objective:** You are an expert Software Architect. Your task is to generate strict, beautifully routed UML Component Diagrams to model system modularity, functional independence, interfaces, and inter-module data flow based on a provided scenario.

**Execution Protocol:**
Execute sequentially. Do not ask for intermediate confirmation. Do not half-ass the architectural decomposition.

1. **Context Ingestion (Strict PDF Parsing):** - Read the scenario from the SDA Lab Manual by running `node scripts/read_pdf.js 5` (Experiment 5 — Modular Design). If the user specifies a different experiment, use that number instead. If the user provides their own scenario directly in the prompt, use that scenario instead of reading from the lab manual.
   - Analytically decompose the system into functional, self-contained **Modules (Components)**.
   - Identify the exact dependencies, data flows, and interfaces between these modules to ensure high cohesion and low coupling.
2. **PlantUML Generation (CRITICAL STYLING):**
   - Formulate error-free PlantUML syntax for a component diagram.
   - **Anti-Squish & Architectural Styling:** You MUST inject these parameters at the very top of your PlantUML code to ensure crisp, enterprise-grade routing:
     ```plantuml
     skinparam componentStyle uml2
     skinparam linetype ortho
     skinparam nodesep 70
     skinparam ranksep 70
     skinparam defaultTextAlignment center
     ```
   - Syntax standard: Use `component "ModuleName" as alias`. Use `-->` or `..>` to show dependency and data flow direction. Group components inside logical boundaries if necessary using `package` or `node`.
3. **Execution:** - Call the `generate_plantuml_diagram` tool.
   - Set `output_path` to `diagrams/component_architecture.png`.
   - Set `format` to `png`.
4. **Error Correction:** Auto-fix any syntax errors returned by the MCP server until the PNG is successfully generated.
5. **Report Compilation & Conversion:** - Create `reports/Component_Report.md`.
   - After creating the markdown report, you MUST automatically run the conversion script: `node scripts/md_to_docx.js reports/Component_Report.md wordReports/Component_Report.docx`.

**Required Report Structure (`reports/Component_Report.md`):**
# System Modular Architecture Analysis

## Functional Decomposition
*Provide a highly technical list of all identified modules, detailing their specific responsibilities and how they achieve functional independence (high cohesion).*

## Inter-Module Communication
*Detail the data flow and coupling between the modules (e.g., how the Billing module interacts with the Patient Management and Pharmacy modules).*

## Component Diagram
![Component Architecture](../diagrams/component_architecture.png)
