/**
 * index_lab_manual.js — One-Time Lab Manual Indexer
 *
 * Reads "SDA LAB MANUAL.pdf", splits it into per-experiment text files,
 * and saves them to the lab_manual/ directory for instant agent access.
 *
 * Usage:  node scripts/index_lab_manual.js
 * Output: lab_manual/experiment_01.txt ... experiment_15.txt
 *         lab_manual/full_manual.txt
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PDF_PATH = path.join(ROOT, 'SDA LAB MANUAL.pdf');
const OUT_DIR = path.join(ROOT, 'lab_manual');

// --- 1. Extract full PDF text ---
console.log('Extracting text from SDA LAB MANUAL.pdf ...');

let fullText;
try {
    fullText = execSync(
        `npx pdf-parse text "${PDF_PATH}"`,
        { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024, stdio: ['pipe', 'pipe', 'pipe'] }
    );
} catch (error) {
    // pdf-parse CLI may exit code 1 but still produce stdout
    if (error.stdout) {
        fullText = error.stdout;
    } else {
        console.error('FATAL: Could not extract PDF text.', error.message);
        process.exit(1);
    }
}

// --- 2. Create output directory ---
if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

// --- 3. Save full dump ---
const fullPath = path.join(OUT_DIR, 'full_manual.txt');
fs.writeFileSync(fullPath, fullText, 'utf-8');
console.log(`  -> full_manual.txt (${(fullText.length / 1024).toFixed(1)} KB)`);

// --- 4. Split into experiments ---
// Pattern: "Experiment N –" (the – is the Unicode en-dash \u2013 rendered as "ΓÇô" in some encodings)
const expPattern = /^(Experiment\s+(\d+)\s*[\u2013\-–—]+)/im;

const lines = fullText.split('\n');
let currentExp = null;
let currentLines = [];
let savedCount = 0;

function saveExperiment() {
    if (currentExp !== null && currentLines.length > 0) {
        const num = String(currentExp).padStart(2, '0');
        const filePath = path.join(OUT_DIR, `experiment_${num}.txt`);
        const content = currentLines.join('\n').trim();
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`  -> experiment_${num}.txt (${(content.length / 1024).toFixed(1)} KB)`);
        savedCount++;
    }
}

for (const line of lines) {
    // Check if this line starts a new experiment header
    const match = line.match(expPattern);
    if (match) {
        // Save previous experiment
        saveExperiment();
        // Start new experiment
        currentExp = parseInt(match[2], 10);
        currentLines = [line];
    } else if (currentExp !== null) {
        currentLines.push(line);
    }
}
// Save the last experiment
saveExperiment();

console.log(`\nDone! Indexed ${savedCount} experiments into lab_manual/`);
