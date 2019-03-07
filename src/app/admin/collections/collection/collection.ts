import { CmsDocument } from '../../documents/document/cms-document';
import { MongooseModel } from 'src/app/shared/models/mongose-model';

export interface Collection extends MongooseModel {
  id?: string;
  name: string;
  modelId: string | number;
  documents: CmsDocument[];
}
