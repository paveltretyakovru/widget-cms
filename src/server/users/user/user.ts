import { Schema, model } from 'mongoose';

const schema = new Schema({
	email: { type: String, unique: true, required: true },
	hash: { type: String, required: true  },
  rules: { type: Number, reuired: true, default: 1 }
}, { timestamps: true });

schema.set('toJSON', { virtuals: true  });

export const User = model('User', schema);
