#!/usr/bin/env node
/**
 * Checks that barrel (index.ts) files re-export all public modules in aliased directories.
 * Warns on: files in aliased dirs not re-exported from index; index re-exports missing files.
 * Run in CI or locally: node scripts/check-barrel-completeness.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const ALIASED_DIRS = [
  "components/ui",
  "components/sections",
  "components/shared",
  "components/layouts",
  "components/design-system",
  "components/design-system/variants",
  "components/skeletons",
  "components/automation-flow",
  "components/providers",
  "lib",
  "lib/validations",
  "lib/validators",
  "lib/hooks",
  "lib/db",
  "lib/db/schema",
  "hooks",
  "utils",
  "types",
];

function listTsFiles(dir, base = "") {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full) || !fs.statSync(full).isDirectory()) return [];
  const entries = fs.readdirSync(full, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const rel = path.join(base, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".next") continue;
      files.push(...listTsFiles(path.join(dir, e.name), rel));
    } else if (/\.(ts|tsx)$/.test(e.name) && !e.name.endsWith(".d.ts")) {
      if (e.name === "index.ts" || e.name === "index.tsx") continue;
      if (/\.(test|spec)\.(ts|tsx)$/.test(e.name)) continue;
      files.push(rel);
    }
  }
  return files;
}

function readIndexExports(dir) {
  const indexPath = path.join(ROOT, dir, "index.ts");
  if (!fs.existsSync(indexPath)) return { reExports: [], hasIndex: false };
  const content = fs.readFileSync(indexPath, "utf8");
  const reExports = [];
  const starRe = /export\s+\*\s+from\s+["']\.\/([^"']+)["']/g;
  let m;
  while ((m = starRe.exec(content)) !== null) {
    const file = m[1].replace(/\/index$/, "");
    if (!reExports.includes(file)) reExports.push(file);
  }
  const namedRe = /export\s+(?:type\s+)?\{\s*[^}]+\}\s+from\s+["']\.\/([^"']+)["']/g;
  while ((m = namedRe.exec(content)) !== null) {
    const file = m[1].replace(/\/index$/, "");
    if (!reExports.includes(file)) reExports.push(file);
  }
  const defaultRe = /export\s+\{\s*default\s+as\s+\w+\s*\}\s+from\s+["']\.\/([^"']+)["']/g;
  while ((m = defaultRe.exec(content)) !== null) {
    const file = m[1].replace(/\/index$/, "");
    if (!reExports.includes(file)) reExports.push(file);
  }
  return { reExports, hasIndex: true };
}

function normalizeFile(name) {
  return name.replace(/\.(tsx?)$/, "").replace(/\\/g, "/");
}

function isCoveredByReExports(filePath, reExports) {
  const base = normalizeFile(filePath);
  const baseNoExt = base.replace(/\.(tsx?)$/, "");
  const exportedSet = new Set(reExports.map(normalizeFile));
  if (exportedSet.has(base) || exportedSet.has(baseNoExt)) return true;
  const parts = baseNoExt.split("/");
  for (let i = 1; i < parts.length; i++) {
    const prefix = parts.slice(0, i).join("/");
    if (exportedSet.has(prefix) || exportedSet.has(prefix + "/index")) return true;
  }
  return false;
}

function main() {
  let hasWarnings = false;
  for (const dir of ALIASED_DIRS) {
    const fullDir = path.join(ROOT, dir);
    if (!fs.existsSync(fullDir)) continue;
    const files = listTsFiles(dir);
    const { reExports, hasIndex } = readIndexExports(dir);
    if (!hasIndex && files.length > 0) {
      console.warn(`[barrel] ${dir}: has .ts/.tsx files but no index.ts`);
      hasWarnings = true;
    }
    for (const f of files) {
      if (!isCoveredByReExports(f, reExports)) {
        console.warn(`[barrel] ${dir}: file '${f}' is not re-exported from index.ts`);
        hasWarnings = true;
      }
    }
    for (const re of reExports) {
      const possible = [re, re + ".ts", re + ".tsx", path.join(re, "index.ts"), path.join(re, "index.tsx")];
      const exists = possible.some((p) => fs.existsSync(path.join(ROOT, dir, p)));
      if (!exists) {
        console.warn(`[barrel] ${dir}/index.ts: re-exports '${re}' but file not found`);
        hasWarnings = true;
      }
    }
  }
  process.exit(0);
}

main();
