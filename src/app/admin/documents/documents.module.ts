import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentComponent } from './document/document.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DocumentsComponent } from './documents.component';
import { DocumentListComponent } from './document-list/document-list.component';

@NgModule({
  declarations: [ DocumentComponent, DocumentsComponent, DocumentListComponent ],
  imports: [
    CommonModule,
    ComponentsModule,
    DocumentsRoutingModule
  ]
})
export class DocumentsModule { }
