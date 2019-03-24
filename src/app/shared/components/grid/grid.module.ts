import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { MaterialModule } from 'src/app/material.module';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import { FieldSheetComponent } from './field-sheet/field-sheet.component';
import { GroupDialogComponent } from './group-dialog/group-dialog.component';
import { WidgetContainerComponent } from './widget-container/widget-container.component';
import { GetDocumentFieldComponent } from './field-sheet/get-document-field/get-document-field.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GridComponent,
    FieldSheetComponent,
    GroupDialogComponent,
    WidgetContainerComponent,
    GetDocumentFieldComponent,
  ],

  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxWidgetGridModule,
  ],

  exports: [
    GridComponent,
    WidgetContainerComponent,
    GetDocumentFieldComponent,
  ],

  entryComponents: [
    FieldSheetComponent,
    GroupDialogComponent,
  ],
})
export class GridModule { }
