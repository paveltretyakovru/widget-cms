import { Schema, model } from 'mongoose';

const collectionSchema: Schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  modelId: {
    type: Schema.Types.ObjectId,
  }
});

collectionSchema.set('toJSON', { virtuals: true });

export const Collection = model('Collection', collectionSchema);
