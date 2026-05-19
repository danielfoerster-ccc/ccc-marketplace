// CCC SEO Suite — Shared docx-Build Helpers
// Used by: any skill that generates .docx reports (readiness, strategy-session, weekly-review, quarterly-review, client-handoff)
//
// Why this exists: solves three repeated problems from v0.1:
//   1. Smart-Quotes in German/non-English content break the JS-parser when used as inner-quotes
//   2. Every build-script redefined CCC-brand colors, fonts, margins, table styles
//   3. Header/Footer/Cover patterns were copy-pasted across 5+ build-scripts
//
// Usage from any skill's build-script:
//   const helpers = require('../../_lib/docx-helpers');
//   const { P, H1, H2, BULLET, Cell, COL_NAVY, safeStr } = helpers;

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak
} = require('docx');

// ─── CCC Brand Color Palette ──────────────────────────────────────
const COL_NAVY = '1F2C4D';        // Headings, brand-primary
const COL_BLUE = '2E75B6';        // Subheadings, links, info
const COL_CORAL = 'E07856';       // Accents
const COL_RED = 'C0392B';         // Errors, P0 priorities
const COL_ORANGE = 'E67E22';      // Warnings, P1 priorities
const COL_GREEN = '27AE60';       // Success, completions
const COL_GRAY_BG = 'F2F2F2';     // Subtle table-row background
const COL_LIGHTBLUE_BG = 'D5E8F0';  // Info-row background
const COL_LIGHTRED_BG = 'F8D7DA';   // Error-row background
const COL_LIGHTGREEN_BG = 'D4EDDA'; // Success-row background
const COL_LIGHTYELLOW_BG = 'FFF3CD'; // Warning-row background
const COL_BORDER = 'CCCCCC';       // Default table border

const border = { style: BorderStyle.SINGLE, size: 1, color: COL_BORDER };
const borders = { top: border, bottom: border, left: border, right: border };

// ─── Safe-String for Smart-Quote Bug ──────────────────────────────
// German smart-quotes („…") and similar Unicode characters can confuse
// JS parsers when used as inner-quotes inside double-quoted strings.
// Always run user-provided text through safeStr() before embedding in TextRun().
function safeStr(s) {
  if (s == null) return '';
  return String(s)
    .replace(/[„""]/g, "'")    // German + Right-Double → single quote
    .replace(/[''']/g, "'");   // Smart apostrophe variants → ASCII apostrophe
}

// ─── Paragraph Helpers ────────────────────────────────────────────
const P = (text, opts) => {
  opts = opts || {};
  return new Paragraph({
    spacing: opts.spacing || { before: 0, after: 100 },
    alignment: opts.alignment,
    children: [new TextRun({
      text: safeStr(text),
      bold: opts.bold,
      color: opts.color,
      size: opts.size || 22,
      italics: opts.italics,
      font: opts.font || 'Arial',
    })],
  });
};

// Run multiple TextRuns in one paragraph (for inline formatting)
const PR = (runs, opts) => {
  opts = opts || {};
  return new Paragraph({
    spacing: opts.spacing || { before: 0, after: 100 },
    alignment: opts.alignment,
    children: runs,
  });
};

const R = (text, opts) => {
  opts = opts || {};
  return new TextRun({
    text: safeStr(text),
    bold: opts.bold,
    color: opts.color,
    size: opts.size || 22,
    italics: opts.italics,
    font: opts.font || 'Arial',
  });
};

// ─── Heading Helpers ──────────────────────────────────────────────
const H1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  children: [new TextRun({ text: safeStr(text), bold: true, color: COL_NAVY, size: 32, font: 'Arial' })],
  spacing: { before: 360, after: 200 },
});

const H2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  children: [new TextRun({ text: safeStr(text), bold: true, color: COL_BLUE, size: 28, font: 'Arial' })],
  spacing: { before: 300, after: 160 },
});

const H3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  children: [new TextRun({ text: safeStr(text), bold: true, color: COL_NAVY, size: 24, font: 'Arial' })],
  spacing: { before: 240, after: 120 },
});

// ─── List Helpers ─────────────────────────────────────────────────
const BULLET = (text, opts) => {
  opts = opts || {};
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({
      text: safeStr(text),
      bold: opts.bold,
      color: opts.color,
      size: opts.size || 22,
      font: opts.font || 'Arial',
    })],
  });
};

const NUMBERED = (text, opts) => {
  opts = opts || {};
  return new Paragraph({
    numbering: { reference: 'numbers', level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({
      text: safeStr(text),
      bold: opts.bold,
      color: opts.color,
      size: opts.size || 22,
      font: opts.font || 'Arial',
    })],
  });
};

// ─── Page-Break ───────────────────────────────────────────────────
const PAGE_BREAK = () => new Paragraph({ children: [new PageBreak()] });

// ─── Table Cell Helper ────────────────────────────────────────────
const Cell = (children, opts) => {
  opts = opts || {};
  return new TableCell({
    borders,
    width: { size: opts.width || 4680, type: WidthType.DXA },
    shading: opts.bg ? { fill: opts.bg, type: ShadingType.CLEAR } : undefined,
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    verticalAlign: VerticalAlign.CENTER,
    children: Array.isArray(children) ? children : [children],
  });
};

// ─── Standard CCC Document Wrapper ────────────────────────────────
// Returns a Document with CCC-brand defaults: Arial, A4, 0.75" margins,
// numbering for bullets + numbers, branded header/footer, three heading levels.
function makeCccDocument({ title, creator, description, headerText, children }) {
  creator = creator || 'Daniel Förster · Claude Cowork Consultants';
  headerText = headerText || (title || 'CCC Report');

  return new Document({
    creator: creator,
    title: safeStr(title || 'CCC Report'),
    description: safeStr(description || ''),
    styles: {
      default: { document: { run: { font: 'Arial', size: 22 } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 32, bold: true, color: COL_NAVY, font: 'Arial' },
          paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 28, bold: true, color: COL_BLUE, font: 'Arial' },
          paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 24, bold: true, color: COL_NAVY, font: 'Arial' },
          paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
      ]
    },
    numbering: {
      config: [
        { reference: 'bullets',
          levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
        { reference: 'numbers',
          levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      ]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
        }
      },
      headers: {
        default: new Header({ children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: safeStr(headerText), italics: true, color: '888888', size: 18, font: 'Arial' })],
        })]})
      },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Seite ', color: '888888', size: 18, font: 'Arial' }),
            new TextRun({ children: [PageNumber.CURRENT], color: '888888', size: 18, font: 'Arial' }),
          ],
        })]})
      },
      children: children
    }]
  });
}

// ─── Cover-Page Helper ────────────────────────────────────────────
// Standard CCC cover with title, subtitle, optional badge-stats-row, client name, creator, date.
function makeCoverPage({ title, subtitle, badges, clientName, clientDomain, creator, date }) {
  const items = [
    new Paragraph({
      spacing: { before: 2400, after: 200 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: safeStr(title), bold: true, color: COL_NAVY, size: 48, font: 'Arial' })],
    }),
  ];
  if (subtitle) {
    items.push(new Paragraph({
      spacing: { before: 0, after: 200 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: safeStr(subtitle), italics: true, color: COL_BLUE, size: 30, font: 'Arial' })],
    }));
  }
  if (clientName) {
    items.push(new Paragraph({
      spacing: { before: 800, after: 200 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: safeStr(clientName), bold: true, color: COL_NAVY, size: 40, font: 'Arial' })],
    }));
  }
  if (clientDomain) {
    items.push(new Paragraph({
      spacing: { before: 0, after: 600 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: safeStr(clientDomain), color: COL_BLUE, size: 24, font: 'Arial' })],
    }));
  }
  if (badges && badges.length > 0) {
    // Render badges as one row of equal-width cells
    const badgeColWidth = Math.floor(8400 / badges.length);
    const badgeCells = badges.map(b => Cell([
      P(String(b.value), { bold: true, color: COL_NAVY, size: 56, alignment: AlignmentType.CENTER }),
      P(b.label, { color: '555555', size: 22, alignment: AlignmentType.CENTER }),
    ], { width: badgeColWidth, bg: COL_LIGHTBLUE_BG }));
    items.push(new Table({
      alignment: AlignmentType.CENTER,
      width: { size: 8400, type: WidthType.DXA },
      columnWidths: badges.map(_ => badgeColWidth),
      rows: [new TableRow({ children: badgeCells })],
    }));
  }
  items.push(new Paragraph({ children: [new TextRun('')], spacing: { before: 600 } }));
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: 'Erstellt von', color: '777777', size: 22, font: 'Arial' })],
  }));
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: [new TextRun({ text: safeStr(creator || 'Daniel Förster · Claude Cowork Consultants'), bold: true, size: 26, color: COL_NAVY, font: 'Arial' })],
  }));
  items.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: [new TextRun({ text: safeStr(date || new Date().toLocaleDateString('de-DE')), size: 24, font: 'Arial' })],
  }));
  items.push(PAGE_BREAK());
  return items;
}

// ─── Save Helper ──────────────────────────────────────────────────
async function saveDocx(doc, outPath) {
  const fs = require('fs');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  return { path: outPath, sizeKb: (buffer.length / 1024).toFixed(1) };
}

module.exports = {
  // Re-exports from docx
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak,
  // CCC colors
  COL_NAVY, COL_BLUE, COL_CORAL, COL_RED, COL_ORANGE, COL_GREEN,
  COL_GRAY_BG, COL_LIGHTBLUE_BG, COL_LIGHTRED_BG, COL_LIGHTGREEN_BG, COL_LIGHTYELLOW_BG, COL_BORDER,
  border, borders,
  // String safety
  safeStr,
  // Paragraph + Run builders
  P, PR, R,
  // Headings
  H1, H2, H3,
  // Lists
  BULLET, NUMBERED,
  // Layout
  PAGE_BREAK, Cell,
  // Document factories
  makeCccDocument, makeCoverPage, saveDocx,
};
