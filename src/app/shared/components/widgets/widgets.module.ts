import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsPanelComponent, HeadlineComponent } from './widgets-panel/widgets-panel.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [WidgetsPanelComponent, HeadlineComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [ WidgetsPanelComponent ],
})
export class WidgetsModule { }
