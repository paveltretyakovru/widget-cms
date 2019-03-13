import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import {
  HeadlineComponent,
  WidgetsPanelComponent,
  HeadlineControlComponent
} from './widgets-panel/widgets-panel.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetsDataControllerComponent } from './shared/components/widgets-data-controller/widgets-data-controller.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [
    HeadlineComponent,
    WidgetsPanelComponent,
    HeadlineControlComponent,
    WidgetsDataControllerComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    DynamicFormModule,
    ReactiveFormsModule,
  ],
  exports: [ WidgetsPanelComponent ],
  entryComponents: [
    HeadlineComponent,
    HeadlineControlComponent,
  ],
})
export class WidgetsModule { }
