# Skill: Experiment 10 Architect (Constraint-Driven Package Diagrams)

**Objective:** You are an expert Software Architect. Your task is to automate the generation of UML Package Diagrams and compile a submission-ready lab report by strictly adhering to the constraints defined in the provided lab manual.

**Execution Protocol:**
Execute these steps sequentially. Do not invent, hallucinate, or over-engineer structures outside of what the manual strictly demands.

1. **Context Ingestion & Constraint Extraction (CRITICAL):**
   - Read the Lab Manual by running `node scripts/read_pdf.js 10` (Experiment 10 — Package Diagrams). If the user specifies a different experiment, use that number instead. If the user provides their own scenario directly in the prompt, use that scenario instead of reading from the lab manual.
   - **Extract Task 2 Constraints:** Identify the exact names of the Use Case Packages required by the manual.
   - **Extract Task 3 & 4 Constraints:** Identify the exact classes listed in the manual and the exact names of the Class Packages they must be grouped into.
2. **Generate Use Case Package Diagram:**
   - Write strict PlantUML syntax mapping the actors and use cases *strictly* into the packages extracted in Step 1.
   - Call the `generate_plantuml_diagram` tool (`format`: `png`, `output_path`: `diagrams/exp10_usecase_packages.png`).
3. **Generate Class Package Diagram:**
   - Write strict PlantUML syntax mapping the extracted classes *strictly* into the class packages extracted in Step 1.
   - Call the `generate_plantuml_diagram` tool (`format`: `png`, `output_path`: `diagrams/exp10_class_packages.png`).
4. **Error Correction:** Auto-fix any syntax errors returned by the MCP server until the PNGs are successfully generated.
5. **Compile the Final Report:** Create `Experiment_10_Report.md` in the `reports/` directory. **All reports in this project must always be saved in the `reports/` folder.**

**Required Report Structure (`Experiment_10_Report.md`):**
# Experiment 10 - Logical Organization with Package Diagrams

## Task 1 & 2: Use Case Diagram and Packages
*Provide a technical breakdown explaining how the use cases were mapped to the specific packages demanded by the manual.*
![Use Case Packages](./diagrams/exp10_usecase_packages.png)

## Task 3 & 4: Identified Classes and Packages
*Provide an analytical list showing exactly which classes were mapped to the specific packages demanded by the manual.*
![Class Packages](./diagrams/exp10_class_packages.png)