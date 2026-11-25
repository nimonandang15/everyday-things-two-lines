import * as fs from "node:fs";

// Two-line explanation of a toaster for a 10-year-old.
// Line 1: a toaster is a tiny tanning bed — bread lies down, gets
// brown on both sides under heat, then pops up when it is done. One
// concrete picture a child can hold in their head, and a surprising
// join: the kitchen appliance and the beach ritual.
// Line 2: the analogy is honest about what it maps (heat browning
// something lying flat, on a timer) and what it leaves out (bread
// never chooses to lie down, and a real sun never pops anything up
// when it is done — the pop-up belongs to the toaster alone).
const line1 =
  "A toaster is a tiny tanning bed where bread lies down to get brown on both sides, then pops up when it is done.";
const line2 =
  "It works because both brown something lying flat with heat on a timer, but it leaves out that bread never chooses to lie down and a real sun never pops anything up when it is done.";
const text = line1 + "\n" + line2;

// Gate: two lines, 1-400 characters total, UTF-8, not only whitespace.
// The text is 292 characters, all ASCII, so it is 292 bytes with no
// trailing newline. ASCII-only is deliberate: byte count equals char
// count, and a smaller text wins an exact tie on the leaderboard.
if (text.length !== 292) {
  throw new Error(`Expected the 292-character entry, got ${text.length}`);
}
if (text.length < 1 || text.length > 400) {
  throw new Error(`Expected 1-400 characters, got ${text.length}`);
}
if (text.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
const lines = text.split("\n");
if (lines.length !== 2) {
  throw new Error(`Expected exactly 2 lines, got ${lines.length}`);
}
if (lines.some((line) => line.trim().length === 0)) {
  throw new Error("Each line must be non-empty");
}
if (lines.some((line) => line.includes("\r"))) {
  throw new Error("Entry must not contain carriage returns");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", text, "utf8");
