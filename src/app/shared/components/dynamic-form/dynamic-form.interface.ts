import { Model } from 'src/app/admin/models/model/model';

export interface DynamicFormComponentInterface {
  title: string;
  dialog: boolean;
  fields: DynamicFormField[];
  options: DynamicFormOptions;
  specificFields: DynamicFormField[];
}

export interface DynamicFormField {
  name: string;
  type: string;
  value: string;
}

export interface DynamicFormOptions {
  title?: string;
  model?: Model;
  fields?: DynamicFormField[];
  dialog?: boolean;
  collectionId?: string;
}
