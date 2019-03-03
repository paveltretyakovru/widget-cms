import { Model } from './model';

export class ModelService {
	async create(modelData) {
		if (await Model.findOne({name: modelData.name})) {
			throw `Model with a ${modelData.name} name is exists`;
		}

		const model = new Model(modelData);

		await model.save();
		return model;
	}

	async getById(id) {
		return await Model.findById(id);
	}

	async getAll() {
		return await Model.find();
	}

	async update(id, data) {
		const model = await Model.findById(id);

		if (!model) throw 'Model not found!';
		
		Object.assign(model, data);
		await model.save();
		
		return model;
	}
}
