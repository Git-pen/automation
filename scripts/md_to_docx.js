const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ImageRun, AlignmentType } = require('docx');

// --- CLI Arguments ---
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node md_to_docx.js <input.md> <output.docx>');
  process.exit(1);
}
const inputPath = path.resolve(args[0]);
const outputPath = path.resolve(args[1]);

// Ensure output directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const mdContent = fs.readFileSync(inputPath, 'utf-8');
const lines = mdContent.split('\n');
const baseDir = path.dirname(inputPath);

const children = [];
let inTable = false;
let tableRows = [];

function processInlineFormatting(text) {
  const runs = [];
  const regex = /(\*\*(.+?)\*\*|`(.+?)`|(.+?))/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      runs.push(new TextRun({ text: match[2], bold: true, font: "Calibri", size: 22 }));
    } else if (match[3]) {
      runs.push(new TextRun({ text: match[3], font: "Consolas", size: 20, color: "2E86C1" }));
    } else if (match[4]) {
      runs.push(new TextRun({ text: match[4], font: "Calibri", size: 22 }));
    }
  }
  return runs.length > 0 ? runs : [new TextRun({ text: text, font: "Calibri", size: 22 })];
}

function flushTable() {
  if (tableRows.length === 0) return;
  const rows = tableRows.map((row, rowIdx) => {
    const cells = row.split('|').filter(c => c.trim() !== '');
    return new TableRow({
      children: cells.map(cell => new TableCell({
        children: [new Paragraph({
          children: rowIdx === 0
            ? [new TextRun({ text: cell.trim(), bold: true, font: "Calibri", size: 20 })]
            : processInlineFormatting(cell.trim()),
          spacing: { before: 40, after: 40 },
        })],
        width: { size: Math.floor(100 / cells.length), type: WidthType.PERCENTAGE },
      })),
    });
  });
  children.push(new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } }));
  children.push(new Paragraph({ text: "", spacing: { after: 120 } }));
  tableRows = [];
  inTable = false;
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Image lines — embed if file exists
  if (line.match(/^!\[/)) {
    flushTable();
    const imgMatch = line.match(/!\[.*?\]\((.+?)\)/);
    if (imgMatch) {
      const imgPath = path.resolve(baseDir, imgMatch[1]);
      console.log(`  Image: ${imgMatch[1]} -> ${imgPath} (exists: ${fs.existsSync(imgPath)})`);
      if (fs.existsSync(imgPath)) {
        const imgBuf = fs.readFileSync(imgPath);
        // Read PNG dimensions from IHDR chunk (bytes 16-23)
        const pngWidth = imgBuf.readUInt32BE(16);
        const pngHeight = imgBuf.readUInt32BE(20);
        const maxWidth = 580;
        const scale = Math.min(1, maxWidth / pngWidth);
        const width = Math.round(pngWidth * scale);
        const height = Math.round(pngHeight * scale);
        console.log(`  Embedding: ${width}x${height} (original: ${pngWidth}x${pngHeight})`);
        children.push(new Paragraph({
          children: [new ImageRun({
            data: imgBuf,
            transformation: { width, height },
            type: 'png',
          })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 },
        }));
      } else {
        console.log(`  WARNING: Image not found, skipping.`);
      }
    }
    continue;
  }

  // Table rows
  if (line.trim().startsWith('|')) {
    if (line.match(/^\|[\s-:|]+\|$/)) continue;
    inTable = true;
    tableRows.push(line);
    continue;
  } else if (inTable) {
    flushTable();
  }

  // Headings
  if (line.startsWith('# ')) {
    children.push(new Paragraph({
      text: line.replace('# ', ''),
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 240, after: 120 },
    }));
  } else if (line.startsWith('## ')) {
    children.push(new Paragraph({
      text: line.replace('## ', ''),
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 100 },
    }));
  }
  // Bullet points
  else if (line.startsWith('- ')) {
    children.push(new Paragraph({
      children: processInlineFormatting(line.replace(/^- /, '')),
      bullet: { level: 0 },
      spacing: { before: 60, after: 60 },
    }));
  }
  // Italic description
  else if (line.startsWith('*') && line.endsWith('*')) {
    children.push(new Paragraph({
      children: [new TextRun({ text: line.replace(/^\*|\*$/g, ''), italics: true, font: "Calibri", size: 22, color: "555555" })],
      spacing: { before: 80, after: 80 },
    }));
  }
  // Bold-prefixed lines
  else if (line.startsWith('**')) {
    children.push(new Paragraph({
      children: processInlineFormatting(line),
      spacing: { before: 120, after: 60 },
    }));
  }
  // Regular paragraph
  else if (line.trim().length > 0) {
    children.push(new Paragraph({
      children: processInlineFormatting(line),
      spacing: { before: 60, after: 60 },
    }));
  }
}

flushTable();

const doc = new Document({
  sections: [{ properties: {}, children }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`SUCCESS: ${outputPath}`);
});
