import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req, { params }) {
  await connectDB();
  const post = await Post.findById(params.id).populate('repostOf');
  if (!post) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ post });
}

export async function DELETE(req, { params }) {
  const payload = getUserFromRequest(req);
  if (!payload) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  await connectDB();
  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  if (post.author.toString() !== payload.id) {
    return NextResponse.json({ error: 'Not your post.' }, { status: 403 });
  }
  await post.deleteOne();
  return NextResponse.json({ ok: true });
}
