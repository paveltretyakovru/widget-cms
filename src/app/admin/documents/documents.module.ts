import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentComponent } from './document/document.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DocumentsComponent } from './documents.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { MaterialModule } from 'src/app/material.module';
import { DatatableModule } from '../shared/components/datatable/datatable.module';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    DocumentComponent,
    DocumentsComponent,
    DocumentListComponent,
  ],

  imports: [
    CommonModule,
    MaterialModule,
    DatatableModule,
    ComponentsModule,
    DocumentsRoutingModule,
  ],

  entryComponents: [
    DynamicFormComponent,
  ]
})
export class DocumentsModule { }
