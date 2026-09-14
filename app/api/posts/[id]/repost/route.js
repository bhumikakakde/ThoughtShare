import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req, { params }) {
  const payload = getUserFromRequest(req);
  if (!payload) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  await connectDB();
  const [original, user] = await Promise.all([
    Post.findById(params.id),
    User.findById(payload.id)
  ]);
  if (!original) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const repost = await Post.create({
    author: user._id,
    authorName: user.displayName,
    authorUsername: user.username,
    content: '',
    repostOf: original._id
  });

  return NextResponse.json({ post: repost });
}
