import { IRectangle } from 'ngx-widget-grid';
import { ViewContainerRef, ComponentRef } from '@angular/core';
import { WidgetEditorContainerComponent } from './shared/components/widget-editor-container/widget-editor-container.component';

export interface Widget {
  id: string;
  ref: ViewContainerRef;
  type: string;
  factory: ComponentRef<WidgetEditorContainerComponent>;
  position: IRectangle;
  container: ViewContainerRef;

  size: {
    width: number;
    height: number;
  };
}
