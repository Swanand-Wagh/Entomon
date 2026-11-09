import 'server-only';

import { createHash } from 'node:crypto';
import DOMPurify from 'isomorphic-dompurify';

type MediaKind = 'blog' | 'event';
type MediaSlot = 'cover' | 'inline';
type RasterImage = {
  mime: string;
  base64: string;
  size: number;
  version: string;
};

export type PublicMediaParams = {
  kind: string;
  id: string;
  slot: string;
  version: string;
};

const MAX_IMAGE_BYTES = 16 * 1024 * 1024;
const BASE64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

export function isPublicMediaRequest(params: PublicMediaParams): params is PublicMediaParams & {
  kind: MediaKind;
  slot: MediaSlot;
} {
  return (
    (params.kind === 'blog' || params.kind === 'event') &&
    /^[a-f0-9]{24}$/.test(params.id) &&
    (params.slot === 'cover' || params.slot === 'inline') &&
    /^[a-f0-9]{64}$/.test(params.version)
  );
}

function parseRasterImage(source: string): RasterImage | null {
  const value = source.trim();
  const prefix = /^data:(image\/(?:png|jpeg|gif|webp));base64,/i.exec(value);
  if (!prefix) return null;

  const mime = prefix[1].toLowerCase();
  const base64 = value.slice(prefix[0].length);
  if (
    !base64.length ||
    base64.length > Math.ceil(MAX_IMAGE_BYTES / 3) * 4 ||
    base64.length % 4 !== 0 ||
    !/^[A-Za-z0-9+/]*={0,2}$/.test(base64)
  ) {
    return null;
  }

  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  const finalSextet = BASE64_ALPHABET.indexOf(base64[base64.length - padding - 1]);
  // Reject alternate encodings of the same bytes, rather than letting Buffer's permissive decoder accept them.
  if ((padding === 2 && (finalSextet & 15) !== 0) || (padding === 1 && (finalSextet & 3) !== 0)) {
    return null;
  }

  const size = (base64.length / 4) * 3 - padding;
  if (size > MAX_IMAGE_BYTES) return null;

  // Only a small header is decoded while rendering a page; the route decodes the complete image on a cache miss.
  const header = Buffer.from(base64.slice(0, 32), 'base64');
  const validSignature =
    (mime === 'image/png' &&
      size >= 33 &&
      header.subarray(0, 8).equals(PNG_SIGNATURE) &&
      header.toString('ascii', 12, 16) === 'IHDR') ||
    (mime === 'image/jpeg' && size >= 4 && header[0] === 255 && header[1] === 216 && header[2] === 255) ||
    (mime === 'image/gif' && size >= 13 && /^(GIF87a|GIF89a)$/.test(header.toString('ascii', 0, 6))) ||
    (mime === 'image/webp' &&
      size >= 20 &&
      header.toString('ascii', 0, 4) === 'RIFF' &&
      header.toString('ascii', 8, 12) === 'WEBP' &&
      header.readUInt32LE(4) + 8 === size);
  if (!validSignature) return null;

  // Canonical base64 plus MIME identifies the exact response bytes and type without allocating a full decoded copy.
  const version = createHash('sha256').update(mime).update('\0').update(base64, 'ascii').digest('hex');
  return { mime, base64, size, version };
}

function mediaUrl(kind: MediaKind, id: string, slot: MediaSlot, version: string): string {
  return `/media/${kind}/${id}/${slot}/${version}`;
}

function publicCover(kind: MediaKind, id: string, source: string): string {
  if (!/^\s*data:/i.test(source)) return source;
  const image = parseRasterImage(source);
  // Keep existing image formats working; only supported raster data is moved to the binary endpoint.
  return image ? mediaUrl(kind, id, 'cover', image.version) : source;
}

function publicRichText(kind: MediaKind, id: string, source: string): string {
  const document = DOMPurify.sanitize(source, { RETURN_DOM: true }) as HTMLElement;
  for (const image of document.querySelectorAll('img[src]')) {
    const src = image.getAttribute('src') ?? '';
    if (!/^\s*data:/i.test(src)) continue;
    const raster = parseRasterImage(src);
    if (raster) {
      image.setAttribute('src', mediaUrl(kind, id, 'inline', raster.version));
    }
  }

  // The editor uses img/src. Do not leave duplicate data URLs in srcset, poster, or custom attributes in public props.
  for (const element of document.querySelectorAll('*')) {
    for (const attribute of Array.from(element.attributes)) {
      if (element.tagName === 'IMG' && attribute.name === 'src') continue;
      if (/^\s*data:/i.test(attribute.value) || (attribute.name === 'srcset' && /data:/i.test(attribute.value))) {
        element.removeAttribute(attribute.name);
      }
    }
  }
  return document.innerHTML;
}

export function publicBlogMedia<T extends { id: string; coverImage: string; content?: string }>(blog: T): T {
  return {
    ...blog,
    coverImage: publicCover('blog', blog.id, blog.coverImage),
    ...(typeof blog.content === 'string' ? { content: publicRichText('blog', blog.id, blog.content) } : {}),
  };
}

export function publicEventMedia<T extends { id: string; coverImage: string; description?: string }>(event: T): T {
  return {
    ...event,
    coverImage: publicCover('event', event.id, event.coverImage),
    ...(typeof event.description === 'string'
      ? { description: publicRichText('event', event.id, event.description) }
      : {}),
  };
}

export function findPublicMedia(source: string, slot: MediaSlot, version: string): RasterImage | null {
  if (slot === 'cover') {
    const image = parseRasterImage(source);
    return image?.version === version ? image : null;
  }

  const document = DOMPurify.sanitize(source, { RETURN_DOM: true }) as HTMLElement;
  for (const element of document.querySelectorAll('img[src]')) {
    const image = parseRasterImage(element.getAttribute('src') ?? '');
    if (image?.version === version) return image;
  }
  return null;
}
