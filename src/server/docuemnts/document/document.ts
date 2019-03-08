import { Schema, model } from 'mongoose';

const documentFiledsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  value: {
    type: Schema.Types.Mixed,
  }
});

const documentSchema = new Schema({
  name: {
    type: String,
    default: 'no name document',
    required: true,
  },
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  pageId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  fields: [ documentFiledsSchema ],
}, { timestamps: true });

documentSchema.set('toJSON', { virtuals: true });

export const Document = new model('Document', documentSchema);
