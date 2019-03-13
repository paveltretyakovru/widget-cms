import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { DocumentFormModule } from './document-form/document-form.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DynamicFormModule,
    DocumentFormModule,
  ],
  exports: [
    DynamicFormModule,
    DocumentFormModule,
  ],
})
export class ComponentsModule { }
