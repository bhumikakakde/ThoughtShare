'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import SearchBox from '@/components/SearchBox';
import PostComposer from '@/components/PostComposer';
import PostCard from '@/components/PostCard';

export default function FeedPage() {
  const [user, setUser] = useState(undefined);
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const hashtag = searchParams.get('hashtag');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.replace('/login');
        } else {
          setUser(data.user);
        }
      });
  }, [router]);

  useEffect(() => {
    const url = hashtag ? `/api/posts?hashtag=${encodeURIComponent(hashtag)}` : '/api/posts';
    fetch(url)
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []));
  }, [hashtag]);

  if (user === undefined) return null;

  return (
    <div>
      <Navbar user={user} />
      <div className="container">
        <SearchBox />
        {hashtag && (
          <div className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Showing posts tagged <b>{hashtag}</b></span>
            <a href="/feed">Clear filter</a>
          </div>
        )}
        <PostComposer onPosted={(p) => setPosts((prev) => [p, ...prev])} />
        {posts.map((p) => (
          <PostCard key={p._id} post={p} currentUser={user} />
        ))}
        {posts.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>No thoughts yet. Be the first to share one!</p>}
      </div>
    </div>
  );
}
