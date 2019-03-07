import { Schema, model } from 'mongoose';

export const ModelFieldSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: { type: String },
  value: { type: Schema.Types.Mixed, default: null },
});

const ModelSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  fields: [ ModelFieldSchema ],
}, { timestamps: true });

ModelSchema.set('toJSON', { virtuals: true });

export const Model = model('Model', ModelSchema);

