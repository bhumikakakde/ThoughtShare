import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim();

  if (!q) return NextResponse.json({ users: [] });

  await connectDB();

  const regex = new RegExp(q, 'i');
  const users = await User.find({
    $or: [{ username: regex }, { displayName: regex }]
  })
    .select('username displayName avatar')
    .limit(8);

  return NextResponse.json({ users });
}
