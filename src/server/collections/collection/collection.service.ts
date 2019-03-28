import { Collection } from './collection';

export class CollectionService {
  async create(model) {
    if (await Collection.findOne({ name: model.name })) {
      throw new Error(`Collection with a ${ model.name } name is exists`);
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
      throw new Error('Collection not found!');
    }

    Object.assign(collection, data);
    await collection.save();

    return collection;
  }

  /**
   * Search collections by ids array
   * @param { [String] } ids: Collections ids to search
   * @returns { Collection[] } Return colection of collection
   */
  async getByIds(ids: string[]) {
    return (ids.length)
      ? await Collection.find({ '_id': { $in: ids } })
      : [];
  }

  async deleteById(_id: string) {
    return await Collection.deleteOne({ _id });
  }
}
