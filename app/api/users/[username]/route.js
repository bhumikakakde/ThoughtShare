import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req, { params }) {
  await connectDB();
  const user = await User.findOne({ username: params.username.toLowerCase() })
    .select('-passwordHash')
    .populate('followers', 'username displayName')
    .populate('following', 'username displayName');
  if (!user) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ user });
}

export async function PATCH(req, { params }) {
  const body = await req.json();
  await connectDB();
  const user = await User.findOneAndUpdate(
    { username: params.username.toLowerCase() },
    { $set: { bio: body.bio, avatar: body.avatar, displayName: body.displayName } },
    { new: true }
  ).select('-passwordHash');
  return NextResponse.json({ user });
}
