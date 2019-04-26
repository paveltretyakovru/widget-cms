import { Schema, model } from 'mongoose';

const imageSchema: Schema = new Schema({
  url: { type: String, default: null },
  title: { type: String, default: null },
  description: { type: String, default: null },

  field: {
    type: {
      id: Schema.Types.ObjectId,
      documentId: Schema.Types.ObjectId,
    },
    default: null,
  }
}, {
  timestamps: true,
});

imageSchema.set('toJSON', { virtuals: true });

export const Image = model('Image', imageSchema);
