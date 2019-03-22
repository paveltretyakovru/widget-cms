import { Widget } from '../../../widget';
import { WidgetEditorDialogComponent } from './widget-editor-dialog.component';
import { MatDialogRef, MatDialogConfig } from '@angular/material';
import { WidgetEditorConfiguration } from '../../../widget-editor';

export interface WidgetEditorDialog {
  // Constructor properties
  widget: Widget;
  widgets: Widget[];
  dialogRef: MatDialogRef<WidgetEditorDialogComponent>;

  // Configuration
  widgetEditorConfiguration: WidgetEditorConfiguration;

  // Methods
  onClickDone(): void;
  widgetsChanged(widgets: Widget[]): void;
  prepareWidgetEditorConfiguration(): void;
}

export interface WidgetEditorDialogConfig extends MatDialogConfig {
  data: Widget;
}
