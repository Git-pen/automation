# ⚡ SDA Automation

> **Stop drawing diagrams by hand. Stop formatting Word reports at 2 AM.**
> One command. Perfect UML diagrams. Publication-ready reports. Every time.

SDA Automation is an AI-driven pipeline that turns your Software Design & Architecture lab experiments into polished, submission-ready deliverables — **in seconds, not hours**.

Drop in your lab manual PDF, tell the agent which experiment you're working on, and walk away with beautifully styled UML diagrams and a fully formatted Word document. No copy-pasting. No fighting with diagram tools. No last-minute formatting disasters.

---

## 🎯 Why This Exists

Every SDA student knows the pain:

1. **Read** a 200-page lab manual to find the one experiment you need.
2. **Draw** UML diagrams in some clunky tool, hoping the syntax is right.
3. **Write** a report in Word, manually embedding screenshots and formatting tables.
4. **Repeat** for 15 experiments across the semester.

**SDA Automation eliminates steps 1 through 4.** It pre-indexes the entire lab manual for instant lookup, auto-generates syntactically valid PlantUML diagrams, and compiles everything into a clean `.docx` — ready to print and submit.

---

## ✨ Features

| Feature | What It Does |
|---|---|
| 📖 **Lab Manual Indexer** | Splits the 200+ page PDF into individual experiment files for instant, keyword-searchable access |
| 🏗️ **UML Diagram Engine** | Generates Class, Component, Deployment, Sequence, Activity, and Package diagrams with consistent, professional styling |
| 📝 **Report Pipeline** | Produces structured Markdown reports and auto-converts them to `.docx` with embedded diagrams, tables, and formatting |
| 🧩 **Extensible Skill System** | Modular "architect" skills for each diagram type — and a meta-skill that creates new skills on the fly |
| 🔄 **End-to-End Automation** | From PDF ingestion → diagram generation → report compilation → Word export, all in one flow |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later

### Installation

```bash
git clone https://github.com/Git-pen/automation.git
cd automation
npm install
```

### Index the Lab Manual (One-Time Setup)

Place your `SDA LAB MANUAL.pdf` in the project root, then run:

```bash
node scripts/index_lab_manual.js
```

This creates per-experiment text files (`experiment_01.txt` … `experiment_15.txt`) and a `full_manual.txt` in the `lab_manual/` folder. You only need to do this once.

---

## 🛠️ How to Use

### 1. Read Any Experiment Instantly

No more scrolling through 200 pages. Pull up any experiment by number:

```bash
node scripts/read_pdf.js 5       # Read Experiment 5
node scripts/read_pdf.js 10      # Read Experiment 10
node scripts/read_pdf.js full    # Full manual (fallback)
```

### 2. Generate Diagrams & Reports with Agent Skills

Open the project in an AI-enabled editor (Gemini CLI, VS Code with Gemini, etc.) and simply ask:

```
"Generate the Class Diagram for Experiment 7"
"Create a Component Diagram for a custom e-commerce system"
"Run Experiment 10 — Package Diagrams"
```

The agent reads the relevant skill, ingests the experiment context, generates the PlantUML diagram, saves the `.png` to `diagrams/`, writes a Markdown report to `reports/`, and converts it to a Word doc in `wordReports/`.

### 3. Convert Any Report to Word

Already have a Markdown report? Convert it in one command:

```bash
node scripts/md_to_docx.js reports/Class_Report.md wordReports/Class_Report.docx
```

The converter handles headings, tables, inline formatting, and embedded diagram images automatically.

---

## 📁 Project Structure

```
automation/
├── .agent/
│   ├── rules.md              # Project-wide rules & conventions
│   └── skills/               # Modular agent skill definitions
│       ├── skill_creator.md   # Meta-skill: auto-creates new skills
│       ├── class_architect.md
│       ├── component_architect.md
│       ├── deployment_architect.md
│       ├── sequence_architect.md
│       └── exp10_architect.md
├── diagrams/                  # Generated UML diagram images (.png)
├── reports/                   # Generated Markdown reports
├── wordReports/               # Final Word documents (.docx)
├── lab_manual/                # Pre-indexed experiment text files
├── scripts/
│   ├── index_lab_manual.js    # PDF → per-experiment text splitter
│   ├── read_pdf.js            # CLI experiment reader
│   └── md_to_docx.js          # Markdown → Word converter
└── package.json
```

---

## 🤖 Agent Skills

The heart of the project is its **skill system** — each `.md` file in `.agent/skills/` is a self-contained execution protocol that an AI agent follows step-by-step.

### How Skills Work

Every skill follows a three-phase pipeline:

```
 ┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
 │  1. INGEST       │ ──▶ │  2. GENERATE         │ ──▶ │  3. COMPILE          │
 │  Read experiment │     │  PlantUML diagram    │     │  Markdown + Word     │
 │  or custom input │     │  with validation     │     │  report with images  │
 └─────────────────┘     └─────────────────────┘     └─────────────────────┘
```

### Available Skills

| Skill | Diagram Type | Description |
|---|---|---|
| `class_architect` | Class Diagram | Classes, attributes, methods, relationships |
| `component_architect` | Component Diagram | System components, interfaces, dependencies |
| `deployment_architect` | Deployment Diagram | Nodes, artifacts, deployment topology |
| `sequence_architect` | Sequence Diagram | Object interactions over time |
| `exp10_architect` | Package Diagram | Package organization, class groupings |
| `skill_creator` | *Any* | **Meta-skill** — automatically generates a new skill for any unsupported diagram type |

### Three Input Modes

Every skill supports flexible input — you're never locked into the lab manual:

1. **Lab Manual (default)** — Reads the indexed experiment text automatically.
2. **Custom Experiment** — Specify a different experiment number.
3. **Custom Scenario** — Provide your own system description for diagrams unrelated to the lab manual.

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| **Node.js** | Runtime for all scripts |
| **pdf-parse** | PDF text extraction for lab manual indexing |
| **docx** | Programmatic Word document generation |
| **marked** | Markdown parsing |
| **htmlparser2** | HTML processing for the conversion pipeline |
| **PlantUML** | UML diagram rendering (via agent MCP server) |

---

## 📄 License

This project is for academic use as part of the SDA course at FAST-NUCES.
