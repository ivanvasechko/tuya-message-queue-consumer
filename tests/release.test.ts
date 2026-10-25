import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, expect, it } from 'vitest';

const directories: string[] = [];

afterEach(() => {
  for (const directory of directories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

function checkRelease(version: string, changelog: string, tag?: string) {
  const directory = mkdtempSync(join(tmpdir(), 'tuya-release-test-'));
  directories.push(directory);
  mkdirSync(join(directory, 'scripts'));
  copyFileSync(new URL('../scripts/check-release.mjs', import.meta.url), join(directory, 'scripts/check-release.mjs'));
  writeFileSync(join(directory, 'package.json'), JSON.stringify({ version }));
  writeFileSync(join(directory, 'CHANGELOG.md'), changelog);

  return spawnSync(process.execPath, [join(directory, 'scripts/check-release.mjs')], {
    encoding: 'utf8',
    env: {
      ...process.env,
      GITHUB_REF_TYPE: tag ? 'tag' : '',
      GITHUB_REF_NAME: tag ?? '',
    },
  });
}

it('allows a real release matching its latest changelog and tag', () => {
  const result = checkRelease('0.1.0', '## [Unreleased]\n\n## [0.1.0] - 2026-10-25\n\n- First release.\n', 'v0.1.0');

  expect(result.status).toBe(0);
});

it('rejects bootstrap placeholder publication', () => {
  const result = checkRelease('0.0.0', '## [0.0.0] - 2026-10-25\n');

  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain('Do not publish a bootstrap placeholder');
});

it('rejects a version without matching latest release notes', () => {
  const result = checkRelease('0.1.0', '## [0.2.0] - 2026-10-25\n\n## [0.1.0] - 2026-10-24\n');

  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain('Version must match latest CHANGELOG release');
});

it('rejects a tag that differs from the package version', () => {
  const result = checkRelease('0.1.0', '## [0.1.0] - 2026-10-25\n', 'v0.2.0');

  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain('Tag must match package version');
});
