'use client';

const STICKERS = ['😀', '😂', '😍', '🥳', '😢', '😡', '🔥', '💡', '🌟', '❤️', '👍', '🙏', '✨', '🎉', '💭', '🌈'];

export default function StickerPicker({ onPick, onClose }) {
  return (
    <div className="card">
      <div className="sticker-row">
        {STICKERS.map((s) => (
          <button key={s} type="button" className="sticker-btn" onClick={() => onPick(s)}>
            {s}
          </button>
        ))}
      </div>
      <button type="button" className="btn btn-outline btn-small" onClick={onClose}>Close</button>
    </div>
  );
}
