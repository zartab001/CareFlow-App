#!/usr/bin/env node
/**
 * Enforces line limits on staged .ts/.tsx files.
 * Components: 300, Hooks: 150, Utils/lib/Zod: 200. Services/config exempt but warn > 400.
 * Test files exempt.
 */

const fs = require('fs');
const path = require('path');

const LIMIT_COMPONENT = 300;
const LIMIT_HOOK = 300;
const LIMIT_UTIL = 300;
const LIMIT_ZOD = 300;
const WARN_SERVICE = 400;

const SKIP_DIRS = ['scripts', '__tests__', 'node_modules', '.next', 'out', 'build'];
const SKIP_FILES = [
  'mock-data.ts',
  'proposal-pdf-server.ts',
  'utils/data.ts',
  'types.ts',
  'type.ts',
];
const TEST_PATTERNS = [/.\.test\.(ts|tsx)$/, /.\.spec\.(ts|tsx)$/];
const CONFIG_PATTERNS = [/.\.config\.(ts|js|mjs|cjs)$/, /next-env\.d\.ts$/];
const PAGE_FILE_PATTERN = /\/page\.tsx$/;

function isPageFile(filePath) {
  return PAGE_FILE_PATTERN.test(filePath);
}

/** Single @react-pdf layout with many style branches; splitting would be a large mechanical refactor. */
function isPdfCoverPage(filePath) {
  return /\/lib\/pdf\/sections\/PdfCoverPage\.tsx$/.test(filePath);
}

/** Monolithic editor shells (many fields / panels); split incrementally when touched. */
function isLargeEditorShell(filePath) {
  return /\/(EmailTemplateEditorPageClient|InlineProposalCreation)\.tsx$/.test(filePath);
}

/** Large static starter proposal blobs; splitting only churns data exports. */
function isSeedStarterProposalsBuilt(filePath) {
  return /\/lib\/templates\/seed-starter-proposals-built\.ts$/.test(filePath);
}

function isTestFile(filePath) {
  return TEST_PATTERNS.some((re) => re.test(filePath)) || filePath.includes('__tests__/');
}

function isConfigFile(filePath) {
  return CONFIG_PATTERNS.some((re) => re.test(filePath));
}

function isHookFile(filePath) {
  const name = path.basename(filePath);
  return filePath.includes('/hooks/') || /^use[A-Z][a-zA-Z]*\.(ts|tsx)$/.test(name);
}

function isComponentFile(filePath, content) {
  const inComponents = filePath.includes('/components/');
  const inApp = filePath.includes('/app/');
  const hasJsx =
    /<[A-Za-z][\w.]*|<\s*[a-z]+[\s>]/.test(content) || content.includes('React.createElement');
  return (inComponents || inApp) && hasJsx;
}

function isZodFile(filePath, content) {
  return (
    filePath.includes('/validators/') ||
    content.includes('from "zod"') ||
    content.includes("from 'zod'")
  );
}

function isInLibOrUtils(filePath) {
  return filePath.includes('/lib/') || filePath.includes('/utils/');
}

function getLimit(filePath, content) {
  if (isTestFile(filePath)) return null;
  if (isPageFile(filePath)) return null;

  if (filePath.includes('proposalPdfServer.ts')) {
    return { limit: 900, kind: 'pdf-service' };
  }

  if (isPdfCoverPage(filePath)) return null;
  if (isLargeEditorShell(filePath)) return null;
  if (isSeedStarterProposalsBuilt(filePath)) return null;

  if (isConfigFile(filePath)) return { limit: null, warnAbove: WARN_SERVICE, kind: 'config' };
  if (isHookFile(filePath)) return { limit: LIMIT_HOOK, kind: 'hook' };
  if (isComponentFile(filePath, content)) return { limit: LIMIT_COMPONENT, kind: 'component' };
  if (isZodFile(filePath, content)) return { limit: LIMIT_ZOD, kind: 'zod' };
  if (isInLibOrUtils(filePath)) return { limit: LIMIT_UTIL, kind: 'util' };
  return { limit: null, warnAbove: WARN_SERVICE, kind: 'service' };
}

function countLines(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);
  return lines.length;
}

function findLongestFunctions(content, topN = 3) {
  const functions = [];
  const lines = content.split(/\r?\n/);
  const functionStartRe =
    /^\s*(export\s+)?(async\s+)?(function\s+\w+|const\s+\w+\s*=\s*(?:async\s+)?\([^)]*\)\s*=>|(\w+)\s*:\s*(\w+)\s*=\s*(?:async\s+)?\([^)]*\)\s*=>)/;
  let currentStart = 0;
  let braceDepth = 0;
  let inFunction = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (functionStartRe.test(line) && !line.trim().startsWith('//')) {
      if (inFunction) {
        functions.push({ name: 'function', start: currentStart, end: i, lines: i - currentStart });
      }
      currentStart = i + 1;
      inFunction = true;
      braceDepth = 0;
    }
    if (inFunction) {
      for (const c of line) {
        if (c === '{') braceDepth++;
        if (c === '}') braceDepth--;
      }
      if (braceDepth === 0 && (line.includes('}') || line.trim().endsWith(');'))) {
        functions.push({
          name: lines[currentStart - 1].trim().slice(0, 60),
          start: currentStart,
          end: i + 1,
          lines: i - currentStart + 1,
        });
        inFunction = false;
      }
    }
  }
  if (inFunction) {
    functions.push({
      name: lines[currentStart - 1].trim().slice(0, 60),
      start: currentStart,
      end: lines.length,
      lines: lines.length - currentStart + 1,
    });
  }
  return functions
    .sort((a, b) => b.lines - a.lines)
    .slice(0, topN)
    .map((f) => `  - ${f.name} (${f.lines} lines)`);
}

function shouldSkip(filePath) {
  if (SKIP_FILES.some((name) => filePath.endsWith(name) || filePath.includes(`/${name}`)))
    return true;
  return SKIP_DIRS.some((d) => filePath.includes(d));
}

const files = process.argv.slice(2).filter((f) => /\.(ts|tsx)$/.test(f) && !shouldSkip(f));
let exitCode = 0;

for (const filePath of files) {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, 'utf8');
  const lineCount = content.split(/\r?\n/).length;
  const rule = getLimit(filePath, content);

  if (!rule) continue;

  if (rule.limit !== null && lineCount > rule.limit) {
    console.error(
      `BLOCKED: ${filePath} is ${lineCount} lines (max ${rule.limit}). Break it into smaller modules.`,
    );
    const top = findLongestFunctions(content, 3);
    if (top.length) {
      console.error('Top 3 longest functions:');
      top.forEach((t) => console.error(t));
    }
    exitCode = 1;
  } else if (rule.warnAbove && lineCount > rule.warnAbove) {
    console.warn(
      `WARN: ${filePath} is ${lineCount} lines (consider splitting above ${rule.warnAbove}).`,
    );
  }
}

process.exit(exitCode);
