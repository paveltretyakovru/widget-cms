import { Widget } from './widget';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';
import { QueryList, ViewContainerRef } from '@angular/core';

export interface WidgetPlayer {
  widgets: Widget[];

  cols: number;
  rows: number;
  movable: boolean;
  editable: boolean;
  showGrid: boolean;
  minHeight: number;
  resizable: boolean;
  gridWidth: number | null;
  gridHeight: number | null;
  controlPanel: boolean;
  highlightNextPosition: boolean;

  grid: NgxWidgetGridComponent;
  gridWidgetsPlace: QueryList<ViewContainerRef>;
  gridWidgetContainers: QueryList<ViewContainerRef>;

  addWidget(): void;
  onGridFull(event: any): void;
  deleteWidget(index: number): void;
  onWidgetChange(event: WidgetPositionChange): void;
  openWidgetDialog(widget: Widget, type: string, index: number): void;
}
