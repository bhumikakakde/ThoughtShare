'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      fetch(`/api/users/search?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((data) => {
          setResults(data.users || []);
          setOpen(true);
        });
    }, 250); // debounce so we don't hit the API on every keystroke

    return () => clearTimeout(timer);
  }, [query]);

  function goToProfile(username) {
    setOpen(false);
    setQuery('');
    router.push(`/profile/${username}`);
  }

  return (
    <div ref={boxRef} style={{ position: 'relative', marginBottom: 16 }}>
      <input
        placeholder="Search people by name or username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setOpen(true)}
        style={{ marginBottom: 0 }}
      />
      {open && results.length > 0 && (
        <div
          className="card"
          style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            right: 0,
            zIndex: 20,
            padding: 8,
            margin: 0
          }}
        >
          {results.map((u) => (
            <div
              key={u._id}
              onClick={() => goToProfile(u.username)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 6px',
                cursor: 'pointer',
                borderRadius: 8
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#fff3e8')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div className="avatar" style={{ width: 34, height: 34, fontSize: '0.9rem' }}>
                {u.avatar ? <img src={u.avatar} alt="" /> : u.displayName?.[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{u.displayName}</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>@{u.username}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {open && query.trim() && results.length === 0 && (
        <div className="card" style={{ position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 20, margin: 0 }}>
          <p style={{ color: '#888', margin: 0 }}>No people found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
