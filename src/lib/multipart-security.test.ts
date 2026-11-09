import assert from 'node:assert/strict';
import { test } from 'node:test';
import MultipartFormData from 'form-data';

test('a predicted PRNG boundary cannot inject extra multipart fields', async () => {
  // GHSA-fjxv-7rqg-78g4: the attacker can predict Math.random, but not the cryptographic boundary.
  const predictedBoundary = '--------------------------' + '0'.repeat(24);
  const submittedValue =
    `safe\r\n--${predictedBoundary}\r\n` +
    'Content-Disposition: form-data; name="admin"\r\n\r\ntrue';
  const originalRandom = Math.random;
  let form: MultipartFormData;
  try {
    Math.random = () => 0;
    form = new MultipartFormData();
    form.append('bio', submittedValue);
  } finally {
    Math.random = originalRandom;
  }

  const request = new Request('http://localhost/multipart-security', {
    method: 'POST',
    headers: form.getHeaders(),
    body: form.getBuffer(),
  });
  const parsed = await request.formData();
  assert.equal(parsed.get('admin'), null);
  assert.equal(parsed.get('bio'), submittedValue);
});
