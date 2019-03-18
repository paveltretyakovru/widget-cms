import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { DocumentFormModule } from './document-form/document-form.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    DynamicFormModule,
    DocumentFormModule,
    ReactiveFormsModule,
  ],
  exports: [
    DynamicFormModule,
    DocumentFormModule,
  ],
})
export class ComponentsModule { }
