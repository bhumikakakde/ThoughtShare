import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req, { params }) {
  const payload = getUserFromRequest(req);
  if (!payload) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  const { text } = await req.json();
  if (!text || !text.trim()) {
    return NextResponse.json({ error: 'Comment cannot be empty.' }, { status: 400 });
  }

  await connectDB();
  const [post, user] = await Promise.all([
    Post.findById(params.id),
    User.findById(payload.id)
  ]);
  if (!post) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  post.comments.push({
    author: user._id,
    authorName: user.displayName,
    text: text.trim()
  });
  await post.save();

  return NextResponse.json({ comments: post.comments });
}
