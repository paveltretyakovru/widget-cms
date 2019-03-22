import { Widget } from './widget';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';
import { QueryList, ViewContainerRef, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

export interface WidgetEditorConfiguration {
  // Configuration
  rows: number;
  cols: number;
  movable: boolean;
  editable: boolean;
  showGrid: boolean;
  showPanel: boolean;
  resizable: boolean;

  width?: string;
  height?: string;
}

export interface WidgetEditor extends WidgetEditorConfiguration {
  // Outputs
  widgetsChanged: EventEmitter<Widget[]>;

  // Inputs
  configuration: WidgetEditorConfiguration;

  // Constructor
  dialog: MatDialog;

  // Referals variables
  grid: NgxWidgetGridComponent;
  widgetsRef: QueryList<ViewContainerRef>;
  widgetsContainerRef: QueryList<ViewContainerRef>;

  // Data
  widgets: Widget[];

  // Component methods
  addWidget(): Widget;
  onWidgetsChanged(): void;
  findWidgetRefById(id: string): ViewContainerRef;
  prepareConfiguration(): void;
  updateWidgetsSizeData(): void;
  insertContainerToWidget(widget: Widget): void;
  openWidgetEditorDialog(widget: Widget, type: string, index: number): void;
  onWidgetPositionChange($event: WidgetPositionChange): void;
  findWidgetContainerRefById(id: string): ViewContainerRef;
  setListenerToWidgetsRefChanges(): void;
}

// Constants
export const DefaultWidgetEditorConfiguration: WidgetEditorConfiguration = {
  rows: 6,
  cols: 6,
  width: `100%`,
  height: `300px`,
  movable: false,
  editable: false,
  showGrid: false,
  showPanel: false,
  resizable: false,
};
