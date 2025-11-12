import { generate, type GenerateInput } from '../../../lib/generator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerateInput;
    if (!body || !body.destination || !Array.isArray(body.platforms) || body.platforms.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    const out = generate({
      destination: body.destination,
      tone: body.tone ?? 'elegant',
      audience: body.audience ?? 'affluent',
      platforms: body.platforms,
      length: body.length ?? 'medium',
      brandName: body.brandName,
      includeEmojis: body.includeEmojis ?? true,
      includeHashtags: body.includeHashtags ?? true,
      link: body.link,
    });

    return new Response(JSON.stringify(out), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Server error' }), { status: 500 });
  }
}
