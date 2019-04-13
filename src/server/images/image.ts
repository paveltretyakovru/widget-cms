import { Schema, model } from 'mongoose';

const imageSchema: Schema = new Schema({
  url: { type: String, unique: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
}, {
  timestamps: true,
});

imageSchema.set('toJSON', { virtuals: true });

export const Image = model('Image', imageSchema);
