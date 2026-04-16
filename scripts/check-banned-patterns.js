#!/usr/bin/env node
/**
 * Scans staged files for banned patterns. Block = exit 1, Warn = print only.
 * Skips: scripts/, __tests__/, *.test.*, *.spec.*, *.config.*
 */

const fs = require("fs");
const path = require("path");

const SKIP_PATTERNS = [
  (p) => p.includes("/scripts/"),
  (p) => p.includes("__tests__/"),
  (p) => /\.(test|spec)\.(ts|tsx|js|jsx)$/.test(p),
  (p) => /\.config\.(ts|js|mjs|cjs)$/.test(p),
  (p) => p.includes("next-env.d.ts"),
];

function shouldSkip(filePath) {
  return SKIP_PATTERNS.some((fn) => fn(filePath));
}

function isAllowedProcessEnvPath(filePath) {
  const p = filePath.replace(/\\/g, "/");
  return (
    p.startsWith("lib/") ||
    p.includes("/lib/") ||
    p.includes("lib/env") ||
    p.includes("config/env") ||
    (p.includes("config") && p.endsWith("env.ts")) ||
    /\.(config\.|env\.)(ts|js|mjs|cjs)$/.test(p)
  );
}

function isComponentOrAppPage(filePath) {
  return filePath.includes("/components/") || filePath.includes("/app/");
}

const BLOCK = [
  {
    pattern: /:\s*any\b/,
    message: "Use a proper type instead of 'any'. If truly unavoidable, use 'unknown' and narrow.",
  },
  { pattern: /\/\/\s*@ts-ignore/, message: "Fix the type error instead of ignoring it. Use '// @ts-expect-error' with explanation only if absolutely necessary." },
  { pattern: /\/\/\s*@ts-nocheck/, message: "Remove @ts-nocheck. Fix type errors." },
  { pattern: /\bas\s+any\b/, message: "Use proper type narrowing instead of 'as any'." },
  {
    pattern: /console\.log\s*\(/,
    message: "Remove console.log. Use the logger utility for intentional logging.",
  },
  {
    pattern: /console\.warn\s*\(/,
    message: "Remove console.warn. Use the logger utility for intentional logging.",
  },
  {
    pattern: /console\.error\s*\(/,
    message: "Remove console.error. Use the logger utility for intentional logging (e.g. in catch blocks).",
  },
  { pattern: /\bdebugger\b/, message: "Remove debugger statements." },
  { pattern: /\balert\s*\(/, message: "Remove alert()." },
  {
    pattern: /style=\{\{\s*[^}]*\}\}/,
    message: "Use Tailwind classes or extract to a constant. Inline style objects cause re-renders.",
    fileTest: (p) => p.endsWith(".tsx"),
    exclude: (content, lineIndex, lines) => {
      const line = lines[lineIndex];
      return /style=\{\{[^}]*\$\{|style=\{\{[^}]*\w+[^}]*\}\}/.test(line) && /[\w.]+\s*[+\-*\/]?\s*[\w.]*/.test(line);
    },
  },
  {
    pattern: /key=\{(?:index|i)\b\}/,
    message: "Use a stable unique ID as key, not array index.",
  },
  {
    pattern: /document\.(getElementById|querySelector)\s*\(/,
    message: "Use React refs instead of direct DOM manipulation.",
    fileTest: (p) => p.endsWith(".tsx"),
  },
  {
    pattern: /from\s+['"]\.\.\/\.\.\/\.\.\//,
    message: "Use absolute imports (@/ alias) instead of deep relative imports.",
  },
  { pattern: /\beval\s*\(/, message: "Do not use eval()." },
  {
    pattern: /\.innerHTML\s*=/,
    message: "Do not use innerHTML in .tsx.",
    fileTest: (p) => p.endsWith(".tsx"),
  },
  {
    pattern: /\bfetch\s*\(/,
    message: "Use a custom hook or service function for data fetching. No raw fetch in components.",
    fileTest: (p) => isComponentOrAppPage(p),
  },
  {
    pattern: /(localStorage|sessionStorage)\./,
    message: "localStorage/sessionStorage not available server-side. Use a client hook with 'use client'.",
    fileTest: (p, content) => !content || !content.includes("use client"),
  },
  {
    pattern: /process\.env\./,
    message: "Access env vars through the env config module, not process.env directly.",
    fileTest: (p) => !isAllowedProcessEnvPath(p),
  },
];

const WARN = [
  {
    pattern: /useEffect\s*\([^)]*async\s*[^)]*\)\s*=>\s*\{[^}]*fetch\s*\(/s,
    message: "Async useEffect without cleanup. Consider adding abort controller or using a data fetching hook.",
  },
  {
    pattern: /import\s+React\s+from\s+['"]react['"]/,
    message: "React import is not needed in Next.js 16. Remove it.",
  },
  {
    pattern: /dangerouslySetInnerHTML/,
    message: "dangerouslySetInnerHTML found. Ensure content is sanitized. Add a comment explaining how.",
    exclude: (content, lineIndex, lines) => {
      const start = Math.max(0, lineIndex - 2);
      const block = lines.slice(start, lineIndex + 3).join("\n");
      return /\/\/.*sanitiz|sanitize|DOMPurify|sanitization/.test(block);
    },
  },
  {
    pattern: /\/\/\s*(const|let|var|function|return|if|for|await|export)\s+/m,
    message: "Commented-out code detected. Remove it — git has the history.",
    multiLine: true,
  },
  {
    pattern: /(?:TODO|FIXME)(?!\s*\([A-Z]+-\d+\))/,
    message: "Add a ticket/issue reference to your TODO (e.g., TODO(OPF-123): ...).",
  },
  {
    pattern: /new\s+Date\s*\(\)/,
    message: "Use a date formatting utility for consistent date display.",
    fileTest: (p) => !p.includes("lib/utils/dates"),
  },
];

function detectConsecutiveCommentedCode(lines) {
  let consecutive = 0;
  const codeLike = /^\s*\/\/\s*(const|let|var|function|return|if|for|await|export|}\s*;?\s*$)/;
  for (let i = 0; i < lines.length; i++) {
    if (codeLike.test(lines[i])) {
      consecutive++;
      if (consecutive >= 3) return { line: i - 2, message: "Commented-out code detected. Remove it — git has the history." };
    } else {
      consecutive = 0;
    }
  }
  return null;
}

function scanFile(filePath, content) {
  const lines = content.split(/\r?\n/);
  const violations = { block: [], warn: [] };
  const relPath = path.relative(process.cwd(), filePath);

  for (const rule of BLOCK) {
    const fileTest = rule.fileTest ? (p) => rule.fileTest(p, content) : () => true;
    if (!fileTest(relPath)) continue;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (rule.exclude && rule.exclude(content, i, lines)) continue;
      if (rule.pattern.test(line)) {
        violations.block.push({ line: i + 1, pattern: rule.pattern.toString(), message: rule.message });
      }
    }
  }

  const commented = detectConsecutiveCommentedCode(lines);
  if (commented) violations.warn.push({ line: commented.line + 1, message: commented.message });

  for (const rule of WARN) {
    if (rule.multiLine) {
      if (rule.pattern.test(content)) {
        const idx = content.search(rule.pattern);
        const lineNum = content.slice(0, idx).split(/\r?\n/).length;
        violations.warn.push({ line: lineNum, message: rule.message });
      }
    } else {
      for (let i = 0; i < lines.length; i++) {
        if (rule.exclude && rule.exclude(content, i, lines)) continue;
        const fileTest = rule.fileTest || (() => true);
        if (!fileTest(relPath)) continue;
        if (rule.pattern.test(lines[i])) {
          violations.warn.push({ line: i + 1, message: rule.message });
        }
      }
    }
  }

  return violations;
}

const files = process.argv.slice(2).filter((f) => /\.(ts|tsx|js|jsx)$/.test(f) && !shouldSkip(f));
let hasBlock = false;

for (const filePath of files) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, "utf8");
  const { block, warn } = scanFile(fullPath, content);

  for (const v of block) {
    console.error(`\n${filePath}:${v.line} \nBLOCKED — ${v.message}\n`);
    hasBlock = true;
  }
  for (const v of warn) {
    console.warn(`\n${filePath}:${v.line} \nWARN — ${v.message}\n`);
  }
}

process.exit(hasBlock ? 1 : 0);
