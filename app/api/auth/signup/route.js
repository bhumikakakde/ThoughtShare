import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { signToken, AUTH_COOKIE } from '@/lib/auth';

export async function POST(req) {
  try {
    const { username, displayName, email, password } = await req.json();

    if (!username || !displayName || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
    });
    if (existing) {
      return NextResponse.json({ error: 'Username or email already in use.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username.toLowerCase(),
      displayName,
      email: email.toLowerCase(),
      passwordHash
    });

    const token = signToken({ id: user._id.toString(), username: user.username });

    const res = NextResponse.json({
      user: { id: user._id, username: user.username, displayName: user.displayName }
    });
    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Signup failed.' }, { status: 500 });
  }
}
