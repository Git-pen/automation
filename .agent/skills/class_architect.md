---
name: Class Diagram Architect
description: Generate strict, beautifully routed UML Class Diagrams base on system scenarios.
---
# Skill: Class Diagram Architect

**Objective:** You are an expert Software Architect. Your task is to generate strict, beautifully routed UML Class Diagrams to model static system structure, data attributes, operations, and strict object-oriented relationships based on a provided scenario.

**Execution Protocol:**
Execute sequentially. Do not ask for intermediate confirmation. Map the object-oriented architecture flawlessly.

1. **Context Ingestion:** 
   - Parse the source document! To read the SDA Lab Manual, run `node scripts/read_pdf.js 6` (Experiment 6 — Class Diagrams). If the user specifies a different experiment, use that number instead. If the user provides their own scenario directly in the prompt, use that scenario instead of reading from the lab manual.
   - Analytically identify all Classes, their Attributes (with data types), Operations (with return types), and visibility modifiers (+, -, #).
   - Identify all relationships: Associations (with multiplicities like `1..*`), Generalizations (Inheritance), Compositions (Strong containment), and Aggregations (Weak containment).
2. **PlantUML Generation (CRITICAL STYLING):**
   - Formulate error-free PlantUML syntax for a class diagram.
   - **Anti-Squish & Orthogonal Styling:** You MUST inject these parameters at the very top of your PlantUML code to ensure clean, right-angled routing and proper spacing:
     ```plantuml
     skinparam linetype ortho
     skinparam nodesep 70
     skinparam ranksep 70
     skinparam classAttributeIconSize 0
     skinparam defaultTextAlignment center
     ```
   - Syntax standard: Use `class ClassName { -attribute: type \n +operation(): type }`. Use exact relationship arrows: `<|--` (Inheritance), `*--` (Composition), `o--` (Aggregation), and `--` or `-->` (Association). Enclose multiplicities in quotes like `"1" *-- "0..*"`.
3. **Execution:** 
   - Call the PlantUML tool to generate the diagram.
   - Save the diagram specifically to the `diagrams/class_architecture.png` directory.
4. **Error Correction:** Auto-fix any syntax errors returned by the MCP server until the PNG is successfully generated.
5. **Report Compilation & Conversion:** 
   - Rule 1: Compile the final structural breakdown as a Markdown file and save it strictly as `reports/Class_Report.md`.
   - Rule 2: Execute `node scripts/md_to_docx.js reports/Class_Report.md wordReports/Class_Report.docx` to generate the Word Report.

**Required Report Structure (`reports/Class_Report.md`):**
# System Static Architecture Analysis

## Class Definitions
*Provide a technical list of all identified classes, detailing their core responsibilities, attributes, and operations.*

## Structural Relationships
*Provide a strict breakdown of how the classes interact (e.g., identifying the Parent-Child inheritances, the exact Compositions vs Aggregations, and the Multiplicities).*

## Class Diagram
![Class Diagram](../diagrams/class_architecture.png)
