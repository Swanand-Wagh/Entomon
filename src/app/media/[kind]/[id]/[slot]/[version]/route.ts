import { prisma } from '@/db/prisma';
import { findPublicMedia, isPublicMediaRequest, type PublicMediaParams } from '@/lib/public-media';

export const runtime = 'nodejs';

function missingMedia() {
  return new Response(null, {
    status: 404,
    headers: {
      'Cache-Control': 'no-store',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store',
    },
  });
}

export async function GET(_request: Request, { params }: { params: Promise<PublicMediaParams> }) {
  const media = await params;
  if (!isPublicMediaRequest(media)) return missingMedia();

  let source: string | undefined;
  // These are the same unrestricted public records served by /blogs and /events, never user/account/payment media.
  // Select only the requested media-bearing field; do not load rich text for a cover request.
  if (media.kind === 'blog') {
    const blog = await prisma.blog.findUnique({
      where: { id: media.id },
      select: { coverImage: media.slot === 'cover', content: media.slot === 'inline' },
    });
    source = media.slot === 'cover' ? blog?.coverImage : blog?.content;
  } else {
    const event = await prisma.event.findUnique({
      where: { id: media.id },
      select: { coverImage: media.slot === 'cover', description: media.slot === 'inline' },
    });
    source = media.slot === 'cover' ? event?.coverImage : event?.description;
  }

  const image = source ? findPublicMedia(source, media.slot, media.version) : null;
  if (!image) return missingMedia();

  // An edit cannot publish new bytes under an old URL: only an exact current content version gets immutable caching.
  return new Response(Buffer.from(image.base64, 'base64'), {
    headers: {
      'Content-Type': image.mime,
      'Content-Length': String(image.size),
      'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
      ETag: `"${image.version}"`,
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; sandbox",
    },
  });
}
