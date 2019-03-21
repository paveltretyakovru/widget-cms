import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

// Interfaces
import { Widget } from '../../../widget';
import { WidgetEditorDialog } from './widget-editor-dialog';
import { WidgetEditorConfiguration } from '../../../widget-editor';

@Component({
  selector: 'app-widget-editor-dialog',
  templateUrl: './widget-editor-dialog.component.html',
  styleUrls: ['./widget-editor-dialog.component.scss']
})
export class WidgetEditorDialogComponent
  implements WidgetEditorDialog, OnInit {
  widgetEditorConfiguration: WidgetEditorConfiguration;

  constructor(
    public dialogRef: MatDialogRef<WidgetEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public widget: Widget
  ) { }

  ngOnInit() {
    this.prepareWidgetEditorConfiguration();
    console.log('WidgetEditorDialogComponent#ngOnInit()', this.widget);
  }

  prepareWidgetEditorConfiguration(): void {
    if (this.widget) {
      const { width, height } = this.widget.size;
      const { width: cols, height: rows } = this.widget.position;

      this.widgetEditorConfiguration = {
        rows,
        cols,
        width: `${width}px`,
        height: `${height}px`,
        movable: true,
        editable: true,
        showGrid: true,
        showPanel: true,
        resizable: true,
      };
    }
  }

  onDoneClick(): void {
    this.dialogRef.close('Dialog result');
  }
}
