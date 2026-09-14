'use client';
import { useState } from 'react';
import StickerPicker from './StickerPicker';
import GifPicker from './GifPicker';

const FONTS = ['inherit', 'Georgia, serif', "'Courier New', monospace", "'Comic Sans MS', cursive", "'Trebuchet MS', sans-serif"];
const COLORS = ['#2b2b2b', '#ff7a29', '#e85d04', '#1f8a70', '#2f5f98', '#8e44ad'];

export default function PostComposer({ onPosted }) {
  const [content, setContent] = useState('');
  const [fontFamily, setFontFamily] = useState('inherit');
  const [color, setColor] = useState('#2b2b2b');
  const [image, setImage] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const [showGifs, setShowGifs] = useState(false);
  const [posting, setPosting] = useState(false);

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  function addSticker(sticker) {
    setContent((c) => c + ' ' + sticker);
    setShowStickers(false);
  }

  function pickGif(url) {
    setGifUrl(url);
    setShowGifs(false);
  }

  async function submit() {
    if (!content.trim() && !image && !gifUrl) return;
    setPosting(true);
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, fontFamily, color, image, gifUrl })
    });
    setPosting(false);
    if (res.ok) {
      setContent('');
      setImage('');
      setGifUrl('');
      const data = await res.json();
      onPosted(data.post);
    }
  }

  return (
    <div className="card">
      <textarea
        placeholder="What's on your mind? Use #hashtags..."
        value={content}
        style={{ fontFamily, color }}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="composer-toolbar">
        <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
          {FONTS.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>
              {f === 'inherit' ? 'Default font' : f.split(',')[0].replace(/'/g, '')}
            </option>
          ))}
        </select>
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: c,
              border: color === c ? '3px solid #333' : '1px solid #ccc',
              cursor: 'pointer'
            }}
          />
        ))}
        <label className="btn btn-outline btn-small" style={{ cursor: 'pointer' }}>
          📷 Image
          <input type="file" accept="image/*" onChange={handleImage} hidden />
        </label>
        <button type="button" className="btn btn-outline btn-small" onClick={() => setShowStickers((s) => !s)}>
          😀 Stickers
        </button>
        <button type="button" className="btn btn-outline btn-small" onClick={() => setShowGifs((s) => !s)}>
          🎞️ GIF
        </button>
      </div>

      {showStickers && <StickerPicker onPick={addSticker} onClose={() => setShowStickers(false)} />}
      {showGifs && <GifPicker onPick={pickGif} onClose={() => setShowGifs(false)} />}

      {image && (
        <div>
          <img src={image} alt="upload preview" className="post-image" />
          <button type="button" className="btn btn-outline btn-small" onClick={() => setImage('')}>Remove image</button>
        </div>
      )}
      {gifUrl && (
        <div>
          <img src={gifUrl} alt="gif preview" className="post-gif" />
          <button type="button" className="btn btn-outline btn-small" onClick={() => setGifUrl('')}>Remove GIF</button>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={submit} disabled={posting}>
          {posting ? 'Posting...' : 'Post thought'}
        </button>
      </div>
    </div>
  );
}
