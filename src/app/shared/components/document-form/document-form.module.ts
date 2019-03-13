import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentFormComponent } from './document-form.component';
import { NgxEditorModule } from 'ngx-editor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [ DocumentFormComponent ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    NgxEditorModule,
    ReactiveFormsModule,
  ],
  exports: [ DocumentFormComponent ]
})
export class DocumentFormModule { }
