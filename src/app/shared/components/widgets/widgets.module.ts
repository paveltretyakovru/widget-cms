import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  HeadlineComponent,
  WidgetsPanelComponent,
  HeadlineControlComponent
} from './widgets-panel/widgets-panel.component';

import { WidgetsDataControllerComponent } from './shared/components/widgets-data-controller/widgets-data-controller.component';
import { ComponentsModule } from '../components.module';

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
    ComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [ WidgetsPanelComponent ],
  entryComponents: [
    HeadlineComponent,
    HeadlineControlComponent,
  ],
})
export class WidgetsModule { }
