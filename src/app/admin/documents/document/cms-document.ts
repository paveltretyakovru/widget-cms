import { Collection } from '../../collections/collection/collection';
import { CmsDocumentField } from './shared/interfaces/cms-document-field';

export interface CmsDocument {
  _id?: string;
  name: string;
  modelId: string | number;
  collectionId?: string | number;
  fields: CmsDocumentField[];
  collection?: Collection;
}
