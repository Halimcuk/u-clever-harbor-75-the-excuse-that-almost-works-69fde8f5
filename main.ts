// The Excuse That Almost Works — make.fun entry.
//
// Writes the single-line excuse to <outputDir>/entry.txt and checks
// both gates itself: 1-140 characters and at most 20 words.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: boring, verifiable-sounding infrastructure trouble with one
// honest detail (the plumber's 9-to-5 window) — a tired manager sighs "fine".
const ENTRY =
  "Building cut the water for pipe repairs, no toilet or shower till tonight, stuck waiting on the plumber's 9-to-5 window.";

const charCount = [...ENTRY].length;
const wordCount = ENTRY.trim().split(/\s+/).filter(Boolean).length;

if (ENTRY.trim().length === 0 || charCount < 1 || charCount > 140) {
  throw new Error(`character gate failed: ${charCount} characters (need 1-140)`);
}
if (wordCount > 20) {
  throw new Error(`word gate failed: ${wordCount} words (need at most 20)`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote entry.txt: ${charCount} characters, ${wordCount} words`);
