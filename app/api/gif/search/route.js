import { NextResponse } from 'next/server';

// Proxies to Giphy so the API key stays server-side.
// Set GIPHY_API_KEY in .env.local (free key at https://developers.giphy.com/).
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || 'happy';
  const apiKey = process.env.GIPHY_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ gifs: [], error: 'GIPHY_API_KEY not set.' });
  }

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
    q
  )}&limit=12&rating=g`;

  const res = await fetch(url);
  const data = await res.json();
  const gifs = (data.data || []).map((g) => ({
    id: g.id,
    preview: g.images.fixed_height_small.url,
    full: g.images.original.url
  }));

  return NextResponse.json({ gifs });
}
