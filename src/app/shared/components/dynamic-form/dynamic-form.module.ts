import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { DynamicFormComponent } from './dynamic-form.component';
import { RemoveButtonComponent } from '../remove-button/remove-button.component';
import { RemoveButtonModule } from '../remove-button/remove-button.module';

@NgModule({
  declarations: [ DynamicFormComponent ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    NgxEditorModule,
    RemoveButtonModule,
    ReactiveFormsModule,
  ],
  exports: [ DynamicFormComponent ]
})
export class DynamicFormModule { }
