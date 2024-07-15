// models/Blog.js

import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: [{ type: Object }], required: true },
  tags: { type: [String], required: true },
  categories: { type: [String], required: true },
  author: { type: String, ref: 'User', required: true },
  authorName: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

