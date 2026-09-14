import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req, { params }) {
  const payload = getUserFromRequest(req);
  if (!payload) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  await connectDB();
  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const idx = post.likes.findIndex((l) => l.toString() === payload.id);
  if (idx === -1) {
    post.likes.push(payload.id);
  } else {
    post.likes.splice(idx, 1);
  }
  await post.save();

  return NextResponse.json({ likesCount: post.likes.length, liked: idx === -1 });
}
