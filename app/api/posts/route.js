import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

function extractHashtags(text) {
  const matches = text.match(/#[a-zA-Z0-9_]+/g) || [];
  return [...new Set(matches.map((h) => h.toLowerCase()))];
}

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const hashtag = searchParams.get('hashtag');
  const username = searchParams.get('username');

  const query = {};
  if (hashtag) query.hashtags = hashtag.toLowerCase();
  if (username) query.authorUsername = username.toLowerCase();

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .limit(100)
    .populate('repostOf');

  return NextResponse.json({ posts });
}

export async function POST(req) {
  const payload = getUserFromRequest(req);
  if (!payload) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  await connectDB();
  const user = await User.findById(payload.id);
  if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

  const { content, fontFamily, color, image, gifUrl, stickers } = await req.json();
  if (!content && !image && !gifUrl) {
    return NextResponse.json({ error: 'Post cannot be empty.' }, { status: 400 });
  }

  const post = await Post.create({
    author: user._id,
    authorName: user.displayName,
    authorUsername: user.username,
    content: content || '',
    fontFamily: fontFamily || 'inherit',
    color: color || '#2b2b2b',
    image: image || '',
    gifUrl: gifUrl || '',
    stickers: stickers || [],
    hashtags: extractHashtags(content || '')
  });

  return NextResponse.json({ post });
}
