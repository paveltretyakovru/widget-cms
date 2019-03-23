import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { MaterialModule } from 'src/app/material.module';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { WidgetContainerComponent } from './widget-container/widget-container.component';

@NgModule({
  declarations: [
    GridComponent,
    GroupDialogComponent,
    WidgetContainerComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    NgxWidgetGridModule,
  ],

  exports: [
    GridComponent,
  ],

  entryComponents: [
    GroupDialogComponent,
  ],
})
export class GridModule { }
