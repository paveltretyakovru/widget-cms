import { Schema, model } from 'mongoose';

const pageSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  }
}, { timestamps: true });

pageSchema.set('toJSON', { virtuals: true });

export const Page = model('Page', pageSchema);
