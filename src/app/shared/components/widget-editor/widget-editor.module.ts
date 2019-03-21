import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetEditorComponent } from './widget-editor.component';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import { MaterialModule } from 'src/app/material.module';
import { WidgetEditorDialogComponent } from './shared/components/widget-editor-dialog/widget-editor-dialog.component';
import { WidgetEditorContainerComponent } from './shared/components/widget-editor-container/widget-editor-container.component';

@NgModule({
  declarations: [
    WidgetEditorComponent,
    WidgetEditorDialogComponent,
    WidgetEditorContainerComponent
  ],

  imports: [
    CommonModule,
    MaterialModule,
    NgxWidgetGridModule,
  ],

  exports: [
    WidgetEditorComponent,
  ],

  entryComponents: [
    WidgetEditorDialogComponent,
    WidgetEditorContainerComponent,
  ],
})
export class WidgetEditorModule { }
