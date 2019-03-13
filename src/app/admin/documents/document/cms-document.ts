import { Collection } from '../../collections/collection/collection';

export interface CmsDocument {
  _id?: string;
  name: string;
  modelId: string | number;
  collectionId?: string | number;
  fields: {
    name: string;
    value: any;
  }[];
  collection?: Collection;
}
