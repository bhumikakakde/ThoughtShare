import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: String,
    text: { type: String, required: true, maxlength: 500 }
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: String,
    authorUsername: String,
    content: { type: String, required: true, maxlength: 2000 },
    fontFamily: { type: String, default: 'inherit' },
    color: { type: String, default: '#2b2b2b' },
    image: { type: String, default: '' }, // base64 data URL from local upload
    gifUrl: { type: String, default: '' },
    stickers: [{ type: String }], // emoji / sticker codes placed on the post
    hashtags: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [CommentSchema],
    repostOf: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null }
  },
  { timestamps: true }
);

PostSchema.index({ hashtags: 1 });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
