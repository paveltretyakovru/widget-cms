import { Schema, model } from 'mongoose';

const pageSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },

  widgets: [Object],

  size: {
    type: {
      cols: Number,
      rows: Number,
      width: Number,
      height: Number,
    }
  }
}, { timestamps: true });

pageSchema.set('toJSON', { virtuals: true });

export const Page = model('Page', pageSchema);
