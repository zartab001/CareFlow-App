#!/usr/bin/env node
/**
 * Full codebase verification: file length, any types, console, return types,
 * component complexity, dependencies, test coverage gaps.
 * Run: node scripts/verify-codebase.js or npm run verify
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SKIP_DIRS = ["node_modules", ".next", "out", "build", "scripts", ".git"];
const LIMIT_COMPONENT = 300;
const LIMIT_HOOK = 200;
const LIMIT_UTIL = 200;
const LIMIT_ZOD = 200;
const WARN_SERVICE = 400;

function walk(dir, extRe, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (SKIP_DIRS.some((d) => e.name === d || full.includes(path.sep + d + path.sep))) continue;
    if (e.isDirectory()) walk(full, extRe, list);
    else if (extRe.test(e.name)) list.push(path.relative(ROOT, full));
  }
  return list;
}

function getLines(filePath) {
  return fs.readFileSync(path.join(ROOT, filePath), "utf8").split(/\r?\n/).length;
}

function getLimit(filePath, content) {
  const p = filePath.replace(/\\/g, "/");
  const isTest = /\.(test|spec)\.(ts|tsx)$/.test(p) || p.includes("__tests__");
  if (isTest) return null;
  const isConfig = /\.config\.(ts|js|mjs|cjs)$/.test(p);
  if (isConfig) return { limit: null, warn: WARN_SERVICE };
  if (p.includes("/hooks/") || /^use[A-Z][a-zA-Z]*\.(ts|tsx)$/.test(path.basename(p)))
    return { limit: LIMIT_HOOK };
  const hasJsx =
    (p.includes("/components/") || p.includes("/app/")) &&
    (content.includes("<") || content.includes("React.createElement"));
  if (hasJsx) return { limit: LIMIT_COMPONENT };
  if (
    p.includes("/validators/") ||
    content.includes('from "zod"') ||
    content.includes("from 'zod'")
  )
    return { limit: LIMIT_ZOD };
  if (p.includes("/lib/") || p.includes("/utils/")) return { limit: LIMIT_UTIL };
  return { limit: null, warn: WARN_SERVICE };
}

function fileLengthReport() {
  const files = walk(ROOT, /\.(ts|tsx)$/);
  const over = [];
  for (const f of files) {
    const content = fs.readFileSync(path.join(ROOT, f), "utf8");
    const rule = getLimit(f, content);
    if (!rule) continue;
    const lines = getLines(f);
    if (rule.limit != null && lines > rule.limit) over.push({ file: f, lines, limit: rule.limit });
    else if (rule.warn && lines > rule.warn)
      over.push({ file: f, lines, limit: rule.warn, warn: true });
  }
  return over;
}

function countPattern(files, pattern) {
  let count = 0;
  const places = [];
  for (const f of files) {
    if (/\.(test|spec)\.(ts|tsx)$/.test(f) || f.includes("__tests__")) continue;
    const content = fs.readFileSync(path.join(ROOT, f), "utf8");
    const lines = content.split(/\r?\n/);
    lines.forEach((line, i) => {
      const m = line.match(pattern);
      if (m) {
        count += m.length;
        places.push({ file: f, line: i + 1 });
      }
    });
  }
  return { count, places };
}

function missingReturnTypes(files) {
  const missing = [];
  const re = /export\s+(async\s+)?function\s+\w+\s*\([^)]*\)\s*\{/g;
  for (const f of files) {
    if (!f.endsWith(".ts") && !f.endsWith(".tsx")) continue;
    const content = fs.readFileSync(path.join(ROOT, f), "utf8");
    let m;
    while ((m = re.exec(content)) !== null) {
      const pos = content.indexOf(m[0], m.index);
      const line = content.slice(0, pos).split(/\r?\n/).length;
      missing.push({ file: f, line });
    }
  }
  return missing;
}

function componentComplexity(files) {
  const issues = [];
  const componentFiles = files.filter(
    (f) =>
      (f.includes("/components/") || f.includes("/app/")) &&
      (f.endsWith(".tsx") || f.endsWith(".ts")),
  );
  for (const f of componentFiles) {
    const content = fs.readFileSync(path.join(ROOT, f), "utf8");
    const useStateCount = (content.match(/useState\s*\(/g) || []).length;
    const useEffectCount = (content.match(/useEffect\s*\(/g) || []).length;
    const propsMatch = content.match(/^(?:export\s+)?(?:default\s+)?function\s+\w+\s*\(\s*\{\s*([^}]*)\}/m);
    const propCount = propsMatch
      ? propsMatch[1].split(",").map((p) => p.trim().split(/[\s:]/)[0]).filter(Boolean).length
      : 0;
    if (useStateCount > 5) issues.push({ file: f, kind: "useState", count: useStateCount, max: 5 });
    if (useEffectCount > 3) issues.push({ file: f, kind: "useEffect", count: useEffectCount, max: 3 });
    if (propCount > 10) issues.push({ file: f, kind: "props", count: propCount, max: 10 });
  }
  return issues;
}

function testCoverageGaps(files) {
  const componentsAndHooks = files.filter(
    (f) =>
      !/\.(test|spec)\.(ts|tsx)$/.test(f) &&
      (f.includes("/components/") || f.includes("/app/") || f.includes("/hooks/")) &&
      (f.endsWith(".tsx") || f.endsWith(".ts")),
  );
  const withTests = new Set(
    files
      .filter((f) => /\.(test|spec)\.(ts|tsx)$/.test(f))
      .map((f) => f.replace(/\.(test|spec)\.(ts|tsx)$/, "")),
  );
  const gaps = [];
  for (const f of componentsAndHooks) {
    const base = f.replace(/\.(ts|tsx)$/, "");
    if (!withTests.has(base)) gaps.push(f);
  }
  return gaps;
}

function main() {
  const tsFiles = walk(ROOT, /\.(ts|tsx)$/);

  console.log("=== File length (over limit) ===\n");
  const lengthViolations = fileLengthReport();
  lengthViolations.forEach((v) => {
    console.log(
      `  ${v.file}: ${v.lines} lines (max ${v.limit})${v.warn ? " [warn]" : ""}`,
    );
  });
  const lengthFail = lengthViolations.filter((v) => !v.warn).length > 0;

  console.log("\n=== any type count (target: 0) ===\n");
  const anyColon = countPattern(tsFiles, /:\s*any\b/g);
  const anyAs = countPattern(tsFiles, /\bas\s+any\b/g);
  const anyTotal = anyColon.count + anyAs.count;
  console.log(`  Total: ${anyTotal} (: any + as any)`);
  if (anyTotal > 0 && anyColon.places.length + anyAs.places.length <= 20) {
    [...anyColon.places, ...anyAs.places].slice(0, 15).forEach((p) =>
      console.log(`    ${p.file}:${p.line}`),
    );
  }

  console.log("\n=== console statement count (target: 0, excluding tests) ===\n");
  const consoleLog = countPattern(tsFiles, /console\.(log|warn|error|info|debug)\s*\(/g);
  console.log(`  Total: ${consoleLog.count}`);

  console.log("\n=== Missing return types (exported functions) ===\n");
  const missingReturn = missingReturnTypes(tsFiles);
  console.log(`  Total: ${missingReturn.length}`);
  missingReturn.slice(0, 10).forEach((m) => console.log(`    ${m.file}:${m.line}`));

  console.log("\n=== Component complexity (suggest extraction) ===\n");
  const complexity = componentComplexity(tsFiles);
  complexity.forEach((c) =>
    console.log(`  ${c.file}: ${c.kind} count ${c.count} (max ${c.max})`),
  );

  console.log("\n=== Test coverage gaps (component/hook files without test) ===\n");
  const gaps = testCoverageGaps(tsFiles);
  console.log(`  Total: ${gaps.length}`);
  gaps.slice(0, 15).forEach((g) => console.log(`    ${g}`));

  console.log("\n=== Summary ===\n");
  const fail =
    lengthFail ||
    anyTotal > 0 ||
    consoleLog.count > 0 ||
    missingReturn.length > 0 ||
    complexity.length > 0;
  console.log(`  File length: ${lengthFail ? "FAIL" : "PASS"}`);
  console.log(`  any types: ${anyTotal === 0 ? "PASS" : "FAIL"} (${anyTotal})`);
  console.log(`  console: ${consoleLog.count === 0 ? "PASS" : "FAIL"} (${consoleLog.count})`);
  console.log(`  Return types: ${missingReturn.length === 0 ? "PASS" : "INFO"} (${missingReturn.length})`);
  console.log(`  Complexity: ${complexity.length === 0 ? "PASS" : "INFO"} (${complexity.length})`);
  console.log(`  Test gaps: ${gaps.length} files`);

  process.exit(fail ? 1 : 0);
}

main();
