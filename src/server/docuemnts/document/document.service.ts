import { Types } from 'mongoose';
import { Document } from './document';
import { CollectionService } from 'src/server/collections/collection/collection.service';

const ObjectId = Types.ObjectId;

export class DocuemntService {
  async getAll() {
    const documents = await Document.find();
    const collections = await new CollectionService().getByIds(
        documents
          .filter(document => document.collectionId)
          .map(document => document.collectionId)
      );

    return documents.map((doc) => {
      const collection = (doc.collectionId)
        ? collections.find((col) => String(col._id) === String(doc.collectionId))
        : null;

      return { ...doc._doc, collection };
    });
  }

  async getByCollectionId(collectionId) {
    return await Document.find({ collectionId });
  }

  async create(modelData) {
    const { collectionId, modelId, name, pageId } = modelData;

    if (ObjectId.isValid(pageId)) {
      if (await Document.findOne({ pageId, modelId, name })) {
        throw `Document ${name} already exist on the page`;
      }
    }

    if (ObjectId.isValid(collectionId)) {
      if (await Document.findOne({ collectionId, modelId, name })) {
        throw `Document ${name} already exist in collection`;
      }
    }

    if (ObjectId.isValid(collectionId) && ObjectId.isValid(pageId)) {
      if (await Document.findOne({ pageId, collectionId, modelId, name })) {
        throw `Document ${name} already exist`;
      }
    }

    const document = new Document(modelData);


    console.log('on save');
    await document.save();
    return document;
  }

  async update(id, data) {
    const document = await Document.findById(id);

    if (!document) {
      throw 'Document not found!';
    }

    Object.assign(document, data);
    await document.save();

    return document;
  }

  async getById(id) {
    return await Document.findById(id);
  }

  async deleteById(_id) {
    return await Document.deleteOne({ _id });
  }
}
