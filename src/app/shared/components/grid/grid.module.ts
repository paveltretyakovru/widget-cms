import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { MaterialModule } from 'src/app/material.module';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import { FieldSheetComponent } from './shared/components/field-sheet/field-sheet.component';
import { GroupDialogComponent } from './shared/components/group-dialog/group-dialog.component';
import { WidgetContainerComponent } from './shared/components/widget-container/widget-container.component';
import { GetDocumentFieldComponent } from './shared/components/field-sheet/get-document-field/get-document-field.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CollectionSheetComponent } from './shared/components/collection-sheet/collection-sheet.component';
import { LinkSheetComponent } from './shared/components/link-sheet/link-sheet.component';
import { RouterModule } from '@angular/router';
import { ModelSheetComponent } from './shared/components/model-sheet/model-sheet.component';
import { ImageSheetComponent } from './shared/components/image-sheet/image-sheet.component';
import { NgxEditorModule } from 'ngx-editor';
import { RemoveButtonModule } from '../remove-button/remove-button.module';

@NgModule({
  declarations: [
    GridComponent,
    FieldSheetComponent,
    GroupDialogComponent,
    WidgetContainerComponent,
    GetDocumentFieldComponent,
    CollectionSheetComponent,
    LinkSheetComponent,
    ModelSheetComponent,
    ImageSheetComponent,
  ],

  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    NgxEditorModule,
    RemoveButtonModule,
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
    ImageSheetComponent,
    ModelSheetComponent,
    FieldSheetComponent,
    GroupDialogComponent,
    CollectionSheetComponent,
  ],
})
export class GridModule { }
