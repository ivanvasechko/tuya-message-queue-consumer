import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';

const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const changelog = readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8');
const latest = changelog.match(/^## \[(\d+\.\d+\.\d+)\] - \d{4}-\d{2}-\d{2}$/m)?.[1];

assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.notEqual(manifest.version, '0.0.0', 'Do not publish a bootstrap placeholder');
assert.equal(latest, manifest.version, 'Version must match latest CHANGELOG release');
if (process.env.GITHUB_REF_TYPE === 'tag') {
  assert.equal(process.env.GITHUB_REF_NAME, `v${manifest.version}`, 'Tag must match package version');
}
