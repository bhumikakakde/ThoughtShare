'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar({ user }) {
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <div className="navbar">
      <Link href="/feed" className="brand">ThoughtShare</Link>
      <div>
        {user ? (
          <>
            <Link href={`/profile/${user.username}`}>Profile</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Logout</a>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
