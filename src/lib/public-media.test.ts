import assert from 'node:assert/strict';
import { test } from 'node:test';
import { findPublicMedia, isPublicMediaRequest, publicBlogMedia, publicEventMedia } from './public-media.ts';

const ID = '507f1f77bcf86cd799439011';
const PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aMZkAAAAASUVORK5CYII=';
const DATA_URL = `data:image/png;base64,${PNG}`;
const versionOf = (url: string) => url.slice(url.lastIndexOf('/') + 1);

test('large public covers and inline images become URLs without mutating stored editor values', () => {
  const large = Buffer.concat([Buffer.from(PNG, 'base64'), Buffer.alloc(512 * 1024)]).toString('base64');
  const source = {
    id: ID,
    coverImage: `data:image/png;base64,${large}`,
    content: `<p>A photo</p><img src="data:image/png;base64,${large}"><img src="https://example.org/photo.png">`,
  };
  const transformed = publicBlogMedia(source);
  assert.match(transformed.coverImage, new RegExp(`^/media/blog/${ID}/cover/[a-f0-9]{64}$`));
  assert.match(transformed.content, new RegExp(`/media/blog/${ID}/inline/[a-f0-9]{64}`));
  assert.ok(transformed.content.includes('https://example.org/photo.png'));
  assert.ok(JSON.stringify(transformed).length < 500);
  assert.ok(!JSON.stringify(transformed).includes('data:image'));
  assert.ok(source.content.includes(large));
  assert.equal(source.coverImage, `data:image/png;base64,${large}`);

  const served = findPublicMedia(source.coverImage, 'cover', versionOf(transformed.coverImage));
  assert.ok(served);
  assert.deepEqual(Buffer.from(served.base64, 'base64'), Buffer.from(large, 'base64'));
  assert.equal(served.size, Buffer.from(large, 'base64').length);
});

test('versions change with exact bytes and old versions cannot serve edited content', () => {
  const original = publicEventMedia({ id: ID, coverImage: DATA_URL, description: `<img src="${DATA_URL}">` });
  const changedBytes = Buffer.from(PNG, 'base64');
  changedBytes[changedBytes.length - 1] ^= 1;
  const changedSource = `data:image/png;base64,${changedBytes.toString('base64')}`;
  const changed = publicEventMedia({ id: ID, coverImage: changedSource, description: `<img src="${changedSource}">` });
  assert.notEqual(original.coverImage, changed.coverImage);
  assert.equal(findPublicMedia(changedSource, 'cover', versionOf(original.coverImage)), null);
  assert.equal(findPublicMedia(`<img src="${changedSource}">`, 'inline', versionOf(original.coverImage)), null);
  assert.ok(findPublicMedia(changedSource, 'cover', versionOf(changed.coverImage)));
  assert.ok(findPublicMedia(`<img src="${DATA_URL}">`, 'inline', versionOf(original.coverImage)));
});

test('HTML parsing handles entities, uppercase tags and attributes without leaving duplicate inline data', () => {
  const encoded = DATA_URL.replace(/[:;]/g, (character) => character === ':' ? '&#58;' : '&#59;');
  const transformed = publicBlogMedia({
    id: ID,
    coverImage: 'https://example.org/cover.png',
    content: `<IMG SRC='${encoded}' srcset="${DATA_URL} 1x" data-original="${DATA_URL}"><img src="https://example.org/remote.png">`,
  });
  assert.equal(transformed.coverImage, 'https://example.org/cover.png');
  assert.match(transformed.content, /\/media\/blog\/[a-f0-9]{24}\/inline\/[a-f0-9]{64}/);
  assert.ok(!transformed.content.includes(PNG));
  assert.ok(!transformed.content.includes('data:image'));
  assert.ok(transformed.content.includes('https://example.org/remote.png'));
  assert.ok(findPublicMedia(`<IMG SRC='${encoded}'>`, 'inline', versionOf(publicBlogMedia({ id: ID, coverImage: DATA_URL }).coverImage)));
});

test('unsupported SVG, forged raster MIME, invalid base64 and noncanonical padding cannot resolve', () => {
  const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>').toString('base64');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const last = PNG.length - 2;
  const noncanonical = PNG.slice(0, last) + alphabet[alphabet.indexOf(PNG[last]) ^ 1] + '=';
  const invalidSources = [
    `data:image/svg+xml;base64,${svg}`,
    `data:image/png;base64,${svg}`,
    `data:image/png;base64,${PNG.slice(0, -1)}`,
    `data:image/png;base64,${PNG.slice(0, -4)}!!!!`,
    `data:image/png;base64,${noncanonical}`,
    'data:image/png;base64,iVBORw0KGgo=',
  ];
  const validVersion = versionOf(publicBlogMedia({ id: ID, coverImage: DATA_URL }).coverImage);
  for (const source of invalidSources) {
    assert.equal(findPublicMedia(source, 'cover', validVersion), null);
  }
  const svgSource = `data:image/svg+xml;base64,${svg}`;
  const legacyImage = publicBlogMedia({ id: ID, coverImage: svgSource, content: `<img src="${svgSource}">` });
  assert.equal(legacyImage.coverImage, svgSource);
  assert.ok(legacyImage.content.includes(svgSource));
});

test('request identifiers, resource kinds, slots and versions have a strict bounded allowlist', () => {
  const valid = { kind: 'blog', id: ID, slot: 'cover', version: 'a'.repeat(64) };
  assert.equal(isPublicMediaRequest(valid), true);
  assert.equal(isPublicMediaRequest({ ...valid, kind: 'event', slot: 'inline' }), true);
  for (const invalid of [
    { kind: 'user' },
    { id: '../private' },
    { id: 'a'.repeat(1000) },
    { slot: 'password' },
    { version: 'a'.repeat(63) },
    { version: 'z'.repeat(64) },
    { version: 'a'.repeat(64) + '.png' },
  ]) {
    assert.equal(isPublicMediaRequest({ ...valid, ...invalid }), false);
  }
});
