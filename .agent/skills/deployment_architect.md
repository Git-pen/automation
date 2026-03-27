# Skill: Deployment Diagram Architect

**Objective:** You are an expert Software Architect. Your task is to generate strict, beautifully routed UML Deployment Diagrams based on a provided scenario (either pasted directly in the prompt or extracted from a specified document).

**Execution Protocol:**
Execute sequentially. Do not ask for intermediate confirmation.

1. **Context Ingestion:** - Read the scenario from the SDA Lab Manual by running `node scripts/read_pdf.js 9` (Experiment 9 — Deployment Diagrams). If the user specifies a different experiment or provides the scenario directly, use that instead.
   - Analytically extract the physical hardware (`nodes`), execution environments (e.g., servers, OS), software components/files (`artifacts`), and network communication protocols (e.g., TCP/IP, HTTPS).
2. **PlantUML Generation (CRITICAL STYLING):**
   - Formulate error-free PlantUML syntax for a deployment diagram.
   - **Anti-Squish Styling:** You MUST inject these parameters at the very top of your PlantUML code to ensure proper aspect ratio and readability:
     ```plantuml
     left to right direction
     skinparam nodesep 60
     skinparam ranksep 70
     skinparam padding 5
     skinparam defaultTextAlignment center
     ```
   - Syntax standard: Use `node "NodeName" <<device>> { artifact "ArtifactName" }` and map connections using `NodeA -- NodeB : Protocol`.
3. **Execution:** - Call the `generate_plantuml_diagram` tool.
   - Set `output_path` to `diagrams/deployment_architecture.png`.
   - Set `format` to `png`.
4. **Error Correction:** Auto-fix any syntax errors returned by the MCP server until the PNG is successfully generated.
5. **Report Compilation:** Create `Deployment_Report.md` in the `reports/` directory. Then convert it to Word format in `wordReports/` using `node scripts/md_to_docx.js`. **(See `.agent/rules.md` for project-wide output rules.)**

**Required Report Structure (`Deployment_Report.md`):**
# System Deployment Architecture

## Physical Nodes and Artifacts
*Provide a highly technical list of the physical nodes, the execution environments within them, and the specific artifacts deployed on them.*

## Network Communication
*Detail the communication protocols connecting the nodes.*

## Architecture Diagram
![Deployment Diagram](../diagrams/deployment_architecture.png)
