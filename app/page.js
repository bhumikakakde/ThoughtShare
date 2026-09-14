'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        router.replace(data.user ? '/feed' : '/login');
      });
  }, [router]);

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#ff7a29', fontSize: '1.4rem', fontWeight: 700 }}>
      ThoughtShare
    </div>
  );
}
