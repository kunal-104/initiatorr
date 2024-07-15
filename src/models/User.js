// models/User.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  userId:   { type: String, required: true },
  picture:   { type: String, required: true },
  // Add other fields as necessary
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
