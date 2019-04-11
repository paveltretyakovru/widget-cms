import { Schema, model } from 'mongoose';

const imageSchema: Schema = new Schema({
  name: { type: String, unique: true },
  title: String,
  description: String,
}, {
  timestamps: true,
});

imageSchema.set('toJSON', { virtuals: true });

export const Image = model('Image', imageSchema);
