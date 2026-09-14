'use client';
import { useState } from 'react';
import Link from 'next/link';

function renderContent(text) {
  if (!text) return null;
  const parts = text.split(/(#[a-zA-Z0-9_]+)/g);
  return parts.map((part, i) =>
    part.startsWith('#') ? (
      <Link key={i} href={`/feed?hashtag=${encodeURIComponent(part.toLowerCase())}`} className="hashtag">
        {part}
      </Link>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function PostCard({ post, currentUser }) {
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(post.likes?.includes(currentUser?.id));
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [reposted, setReposted] = useState(false);

  async function toggleLike() {
    const res = await fetch(`/api/posts/${post._id}/like`, { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      setLikes(data.likesCount);
      setLiked(data.liked);
    }
  }

  async function submitComment() {
    if (!commentText.trim()) return;
    const res = await fetch(`/api/posts/${post._id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: commentText })
    });
    const data = await res.json();
    if (res.ok) {
      setComments(data.comments);
      setCommentText('');
    }
  }

  async function repost() {
    const res = await fetch(`/api/posts/${post._id}/repost`, { method: 'POST' });
    if (res.ok) setReposted(true);
  }

  const original = post.repostOf;

  return (
    <div className="card">
      <div className="post-header">
        <div className="avatar">{post.authorName?.[0]?.toUpperCase()}</div>
        <div>
          <div style={{ fontWeight: 700 }}>
            <Link href={`/profile/${post.authorUsername}`}>{post.authorName}</Link>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>@{post.authorUsername}</div>
        </div>
      </div>

      {original ? (
        <div>
          <p style={{ color: '#888', fontSize: '0.85rem' }}>🔁 reposted</p>
          <div className="card" style={{ background: '#fff8f2' }}>
            <div style={{ fontWeight: 700 }}>{original.authorName}</div>
            <div className="post-content" style={{ color: original.color, fontFamily: original.fontFamily }}>
              {renderContent(original.content)}
            </div>
            {original.image && <img src={original.image} className="post-image" alt="" />}
            {original.gifUrl && <img src={original.gifUrl} className="post-gif" alt="" />}
          </div>
        </div>
      ) : (
        <>
          <div className="post-content" style={{ color: post.color, fontFamily: post.fontFamily }}>
            {renderContent(post.content)}
          </div>
          {post.image && <img src={post.image} className="post-image" alt="" />}
          {post.gifUrl && <img src={post.gifUrl} className="post-gif" alt="" />}
        </>
      )}

      <div className="post-actions">
        <button className={`action-btn ${liked ? 'active' : ''}`} onClick={toggleLike}>
          ❤️ {likes}
        </button>
        <button className="action-btn" onClick={() => setShowComments((s) => !s)}>
          💬 {comments.length}
        </button>
        <button className={`action-btn ${reposted ? 'active' : ''}`} onClick={repost} disabled={reposted}>
          🔁 {reposted ? 'Reposted' : 'Repost'}
        </button>
      </div>

      {showComments && (
        <div>
          {comments.map((c, i) => (
            <div key={i} className="comment">
              <b>{c.authorName}</b>: {c.text}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <input
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitComment()}
              style={{ marginBottom: 0 }}
            />
            <button className="btn btn-small" onClick={submitComment}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
