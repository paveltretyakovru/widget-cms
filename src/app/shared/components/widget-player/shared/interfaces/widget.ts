import { ViewContainerRef, ComponentRef } from '@angular/core';
import { IRectangle } from 'ngx-widget-grid';

export interface Widget {
  id: string;
  view: ViewContainerRef;
  factory: ComponentRef<any>;
  component: any;
  rectangle: IRectangle;
}
