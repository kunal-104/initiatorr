// models/Video.js

import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  description: { type: [{ type: Object }], required: true },
  tags: { type: [String], required: true },
  categories: { type: [String], required: true },
  author: { type: String, ref: 'User', required: true },
  authorName: { type: String, required: true },

}, { timestamps: true });

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);

