import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';

const report = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
  encoding: 'utf8',
}));
const archives = Array.isArray(report) ? report : Object.values(report);
assert.equal(archives.length, 1, 'Expected exactly one package archive');
const [archive] = archives;
const paths = archive.files.map(({ path }) => path);
const rootFiles = new Set(['package.json', 'README.md', 'LICENSE', 'NOTICE', 'CHANGELOG.md']);

assert(paths.includes('dist/index.js'), 'JavaScript entry point missing');
assert(paths.includes('dist/index.d.ts'), 'Type declarations missing');
for (const file of rootFiles) {
  assert(paths.includes(file), `Required package file missing: ${file}`);
}
for (const path of paths) {
  assert(rootFiles.has(path) || /^dist\/.+\.(?:js|d\.ts)$/.test(path), `Unexpected package file: ${path}`);
}
console.log(`Package allowlist passed (${paths.length} files; package.json is required by npm).`);
