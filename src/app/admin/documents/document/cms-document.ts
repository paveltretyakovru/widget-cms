export interface CmsDocument {
  name: string;
  modelId: string | number;
  collectionId?: string | number;
  fields: {
    name: string;
    value: any;
  }[];
}
