// import { CmsField } from "./cms-field";
import { WidgetContentField } from './widget-content-field';

export interface CmsImage {
  _id?: string;
  url: string;
  title: string;
  field: WidgetContentField;
}
