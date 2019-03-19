import { Widget } from '../../interfaces/widget';
import { SafeHtml } from '@angular/platform-browser';

export interface WidgetPlayerContainer {
  widget: Widget;

  prepareFieldValue(): SafeHtml;
}
