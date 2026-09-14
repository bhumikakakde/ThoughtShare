'use client';
import { useState } from 'react';

export default function GifPicker({ onPick, onClose }) {
  const [query, setQuery] = useState('happy');
  const [gifs, setGifs] = useState([]);
  const [notice, setNotice] = useState('');

  async function search() {
    const res = await fetch(`/api/gif/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setGifs(data.gifs || []);
    if (data.error) setNotice('Add GIPHY_API_KEY in .env.local to enable GIF search.');
  }

  return (
    <div className="card">
      <input
        placeholder="Search GIFs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && search()}
      />
      <button type="button" className="btn btn-small" onClick={search}>Search</button>
      {notice && <p style={{ fontSize: '0.85rem', color: '#c0392b' }}>{notice}</p>}
      <div className="gif-grid">
        {gifs.map((g) => (
          <img key={g.id} src={g.preview} alt="gif" onClick={() => onPick(g.full)} />
        ))}
      </div>
      <button type="button" className="btn btn-outline btn-small" onClick={onClose}>Close</button>
    </div>
  );
}
