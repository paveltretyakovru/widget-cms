import { Collection } from '../../collections/collection/collection';
import { CmsDocumentField } from './shared/interfaces/cms-document-field';
import { makeId } from 'src/app/shared/helpers/make-id';

export interface CmsDocument {
  _id?: string;
  name: string;
  modelId: string;
  collectionId?: string;
  fields: CmsDocumentField[];
  collection?: Collection;
}

export const EMPTY_CMS_DOCUMENT: CmsDocument = {
  name: `Document #${makeId()}`,
  modelId: '',
  fields: [],
  collectionId: '',
};
