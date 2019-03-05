import { Collection } from './collection';

export class CollectionService {
  async create(model) {
    if (await Collection.findOne({ name: model.name })) {
      throw `Collection with a ${ model.name } name is exists`;
    }

    const collection = new Collection(model);

    await collection.save();
    return collection;
  }

  async getAll() {
    return await Collection.find();
  }

  async getById(id) {
    return await Collection.findById(id);
  }

  async update(id, data) {
    const collection = await Collection.findById(id);

    if (!collection) {
      throw 'Collection not found!';
    }

    Object.assign(collection, data);
    await collection.save();

    return collection;
  }
}
