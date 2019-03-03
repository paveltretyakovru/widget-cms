import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';
import { MatTableModule } from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [ DatatableComponent ],
  imports: [
    CommonModule,
		CdkTableModule,
		MatTableModule,
  ],
	exports: [ DatatableComponent ],
})
export class DatatableModule { }
