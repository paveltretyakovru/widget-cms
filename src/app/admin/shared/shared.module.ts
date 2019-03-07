import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableModule } from './components/datatable/datatable.module';

@NgModule({
  imports: [
    CommonModule,
    DatatableModule,
  ],
  exports: [
    DatatableModule,
  ],
})
export class SharedModule { }
