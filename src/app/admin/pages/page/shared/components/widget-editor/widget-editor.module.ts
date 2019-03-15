import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWidgetGridModule } from 'ngx-widget-grid';

import { MaterialModule } from 'src/app/material.module';
import { WidgetEditorComponent } from './widget-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WidgetEditorComponent
  ],

  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxWidgetGridModule,
  ],

  exports: [
    WidgetEditorComponent
  ],

  entryComponents: [
    WidgetEditorComponent,
  ]
})
export class WidgetEditorModule { }
