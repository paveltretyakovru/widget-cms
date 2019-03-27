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
import { CollectionSheetComponent } from './collection-sheet/collection-sheet.component';
import { LinkSheetComponent } from './link-sheet/link-sheet.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GridComponent,
    FieldSheetComponent,
    GroupDialogComponent,
    WidgetContainerComponent,
    GetDocumentFieldComponent,
    CollectionSheetComponent,
    LinkSheetComponent,
  ],

  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxWidgetGridModule,
  ],

  exports: [
    GridComponent,
    WidgetContainerComponent,
    GetDocumentFieldComponent,
  ],

  entryComponents: [
    LinkSheetComponent,
    FieldSheetComponent,
    GroupDialogComponent,
    CollectionSheetComponent,
  ],
})
export class GridModule { }
