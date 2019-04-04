import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveButtonComponent } from './remove-button.component';
import { RemoveButtonDialogComponent } from './remove-button-dialog/remove-button-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RemoveButtonComponent,
    RemoveButtonDialogComponent,
  ],

  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],

  exports: [
    RemoveButtonComponent,
    RemoveButtonDialogComponent,
  ],

  entryComponents: [
    RemoveButtonDialogComponent,
  ]
})
export class RemoveButtonModule { }
