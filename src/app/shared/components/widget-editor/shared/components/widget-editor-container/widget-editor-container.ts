import { WidgetEditorConfiguration } from '../../../widget-editor';
import { Widget } from '../../../widget';
import { SafeHtml } from '@angular/platform-browser';

export interface WidgetEditorContainerConfiguration {
  widget: Widget;
  widgetEditorConfiguration?: WidgetEditorConfiguration;
}

export interface WidgetEditorContainer {
  configuration: WidgetEditorContainerConfiguration;

  preapreFieldValue(): SafeHtml;
}
