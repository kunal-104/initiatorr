// models/Article.js

import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: [{ type: Object }], required: true },
  tags: { type: [String], required: true },
  categories: { type: [String], required: true },
  author: { type: String, ref: 'User', required: true },
  authorName: { type: String, required: true },

  // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

}, { timestamps: true });

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);

