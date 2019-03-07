import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentComponent } from './document/document.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [ DocumentComponent ],
  imports: [
    CommonModule,
    ComponentsModule,
    DocumentsRoutingModule
  ]
})
export class DocumentsModule { }
