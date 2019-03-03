import { Schema, model } from 'mongoose';

const ModelFieldSchema = new Schema({
	fieldName: {
		type: String,
		required: true,
	},
	fieldType: { type: String },
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

