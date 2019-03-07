import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DynamicFormModule,
  ],
  exports: [
    DynamicFormModule,
  ],
})
export class ComponentsModule { }
