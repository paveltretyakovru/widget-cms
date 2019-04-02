import { Schema, model } from 'mongoose';

const configSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  value: {
    type: Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

configSchema.set('toJSON', { virtuals: true });

export const Config = model('Config', configSchema);
