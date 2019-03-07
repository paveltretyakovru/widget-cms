export interface Model {
  _id: string;
  name: string;
  fields: {
    name: string;
    type: string;
    value: any;
  }[];
}
