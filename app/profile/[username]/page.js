'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';

export default function ProfilePage() {
  const { username } = useParams();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.replace('/login');
        } else {
          setCurrentUser(data.user);
        }
      });
  }, [router]);

  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((r) => r.json())
      .then((data) => {
        setProfile(data.user);
        if (currentUser && data.user) {
          setIsFollowing(data.user.followers?.some((f) => f._id === currentUser.id));
        }
      });
    fetch(`/api/posts?username=${username}`)
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []));
  }, [username, currentUser]);

  async function toggleFollow() {
    const res = await fetch(`/api/users/${username}/follow`, { method: 'POST' });
    const data = await res.json();
    if (res.ok) setIsFollowing(data.following);
  }

  if (currentUser === undefined || !profile) return null;
  const isMe = currentUser.username === profile.username;

  return (
    <div>
      <Navbar user={currentUser} />
      <div className="container">
        <div className="card profile-header">
          <div className="avatar" style={{ width: 70, height: 70, fontSize: '1.6rem' }}>
            {profile.avatar ? <img src={profile.avatar} alt="" /> : profile.displayName[0].toUpperCase()}
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{profile.displayName}</h2>
            <p style={{ margin: 0, color: '#888' }}>@{profile.username}</p>
            <p>{profile.bio}</p>
            <span className="stat">{profile.followers?.length || 0}</span> followers &nbsp;
            <span className="stat">{profile.following?.length || 0}</span> following
          </div>
          {!isMe && (
            <button className="btn follow-btn" onClick={toggleFollow}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>

        {posts.map((p) => (
          <PostCard key={p._id} post={p} currentUser={currentUser} />
        ))}
        {posts.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>No thoughts posted yet.</p>}
      </div>
    </div>
  );
}
