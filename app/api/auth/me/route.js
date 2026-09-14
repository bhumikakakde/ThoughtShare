import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const payload = getUserFromRequest(req);
  if (!payload) return NextResponse.json({ user: null });

  await connectDB();
  const user = await User.findById(payload.id).select('-passwordHash');
  return NextResponse.json({ user });
}
