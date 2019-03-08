import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
  declarations: [ DynamicFormComponent ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxEditorModule,
  ],
  exports: [ DynamicFormComponent ]
})
export class DynamicFormModule { }
