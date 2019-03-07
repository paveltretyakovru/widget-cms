import { Types } from 'mongoose';
import { Document } from './document';

const ObjectId = Types.ObjectId;

export class DocuemntService {
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
}
