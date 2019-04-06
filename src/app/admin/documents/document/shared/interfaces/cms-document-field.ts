import { makeId } from 'src/app/shared/helpers/make-id';

export interface CmsDocumentField {
  _id?: string;
  name: string;
  type: string;
  value: any;
}

export const EMPTY_CMS_DOCUMENT_FIELD = {
  name: `Text field ${makeId()}`,
  type: 'text',
  value: '',
};
