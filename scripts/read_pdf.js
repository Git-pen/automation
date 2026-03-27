/**
 * read_pdf.js — Instant Lab Manual Reader
 *
 * Reads pre-indexed experiment content from the lab_manual/ directory.
 * The index is generated once by: node scripts/index_lab_manual.js
 *
 * Usage:
 *   node scripts/read_pdf.js <experiment_number>   → e.g. node scripts/read_pdf.js 5
 *   node scripts/read_pdf.js full                  → dump entire manual
 *
 * If lab_manual/ doesn't exist, prints instructions to run the indexer.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LAB_DIR = path.join(ROOT, 'lab_manual');

const arg = process.argv[2];

if (!arg) {
    console.error('Usage:');
    console.error('  node scripts/read_pdf.js <experiment_number>   (e.g. 5)');
    console.error('  node scripts/read_pdf.js full                  (entire manual)');
    process.exit(1);
}

// Check if lab_manual/ exists
if (!fs.existsSync(LAB_DIR)) {
    console.error('ERROR: lab_manual/ directory not found.');
    console.error('Run the indexer first:  node scripts/index_lab_manual.js');
    process.exit(1);
}

let filePath;

if (arg.toLowerCase() === 'full') {
    filePath = path.join(LAB_DIR, 'full_manual.txt');
} else {
    const num = parseInt(arg, 10);
    if (isNaN(num) || num < 1 || num > 15) {
        console.error(`ERROR: Invalid experiment number "${arg}". Must be 1-15 or "full".`);
        process.exit(1);
    }
    filePath = path.join(LAB_DIR, `experiment_${String(num).padStart(2, '0')}.txt`);
}

if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File not found: ${filePath}`);
    console.error('Try re-running the indexer:  node scripts/index_lab_manual.js');
    process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');
console.log(content);
