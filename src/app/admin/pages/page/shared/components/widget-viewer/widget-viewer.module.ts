import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetViewerComponent } from './widget-viewer.component';
import { NgxWidgetGridModule } from 'ngx-widget-grid';

@NgModule({
  declarations: [
    WidgetViewerComponent,
  ],

  imports: [
    CommonModule,
    NgxWidgetGridModule,
  ],

  exports: [
    WidgetViewerComponent,
  ],
})
export class WidgetViewerModule { }
