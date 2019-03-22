import { Widget } from '../../../widget';
import { SafeHtml } from '@angular/platform-browser';

export interface WidgetEditorContainer {
  widget: Widget;

  preapreFieldValue(): SafeHtml;
}
