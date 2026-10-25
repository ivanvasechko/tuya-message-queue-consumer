import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import * as bootstrap from '../src/index.js';

describe('bootstrap', () => {
  it('does not advertise a runtime API before extraction', () => {
    expect(Object.keys(bootstrap)).toEqual([]);
  });

  it('declares an unofficial MIT package with no runtime dependencies', () => {
    const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

    expect(manifest.name).toBe('@ivanvasechko/tuya-message-queue-consumer');
    expect(manifest.description).toMatch(/^Unofficial/);
    expect(manifest.license).toBe('MIT');
    expect(manifest.dependencies).toBeUndefined();
  });
});
