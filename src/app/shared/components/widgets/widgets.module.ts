import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './widgets.component';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import { MaterialModule } from 'src/app/material.module';
import { WidgetsContainerComponent } from './widgets-container/widgets-container.component';
import { WidgetsDialogComponent } from './widgets-dialog/widgets-dialog.component';

@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsContainerComponent,
    WidgetsDialogComponent,
  ],

  imports: [
    CommonModule,
    MaterialModule,
    NgxWidgetGridModule,
  ],

  exports: [
    WidgetsComponent,
  ],

  entryComponents: [
    WidgetsDialogComponent,
    WidgetsContainerComponent,
  ],
})
export class WidgetsModule { }
