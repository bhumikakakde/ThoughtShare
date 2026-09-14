import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req, { params }) {
  const payload = getUserFromRequest(req);
  if (!payload) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  await connectDB();
  const target = await User.findOne({ username: params.username.toLowerCase() });
  const me = await User.findById(payload.id);
  if (!target || !me) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  if (target._id.toString() === me._id.toString()) {
    return NextResponse.json({ error: "You can't follow yourself." }, { status: 400 });
  }

  const alreadyFollowing = me.following.some((f) => f.toString() === target._id.toString());

  if (alreadyFollowing) {
    me.following = me.following.filter((f) => f.toString() !== target._id.toString());
    target.followers = target.followers.filter((f) => f.toString() !== me._id.toString());
  } else {
    me.following.push(target._id);
    target.followers.push(me._id);
  }

  await Promise.all([me.save(), target.save()]);

  return NextResponse.json({
    following: !alreadyFollowing,
    followerCount: target.followers.length
  });
}
