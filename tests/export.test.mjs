import test from 'node:test';
import assert from 'node:assert/strict';
import { stat } from 'node:fs/promises';

for (const file of [
  'public/audio/narration/full-pythagorean.wav',
  'public/exports/pythagorean-theorem-fallback.webm'
]) {
  test(`${file} is present and nonempty`, async () => {
    const info = await stat(file);
    assert(info.size > 1000);
  });
}
