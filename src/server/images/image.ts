import { Schema, model } from 'mongoose';

const imageSchema: Schema = new Schema({
  url: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },

  field: {
    type: {
      id: String,
      documentId: String,
    },
    default: null,
  }
}, {
  timestamps: true,
});

imageSchema.set('toJSON', { virtuals: true });

export const Image = model('Image', imageSchema);
