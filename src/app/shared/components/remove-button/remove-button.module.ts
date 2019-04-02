import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveButtonComponent } from './remove-button.component';
import { RemoveButtonDialogComponent } from './remove-button-dialog/remove-button-dialog.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    RemoveButtonComponent,
    RemoveButtonDialogComponent,
  ],

  imports: [
    CommonModule,
    MaterialModule,
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
