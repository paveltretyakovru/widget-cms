import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxWidgetGridModule } from 'ngx-widget-grid';

import { MaterialModule } from 'src/app/material.module';

import { WidgetPlayerComponent } from './widget-player.component';
import { WidgetPlayerDialogComponent } from './shared/components/widget-player-dialog/widget-player-dialog.component';
import { WidgetPlayerContainerComponent } from './shared/components/widget-player-container/widget-player-container.component';
import { ComponentsModule } from '../components.module';
import { GetDocumentFieldComponent } from './shared/components/get-document-field/get-document-field.component';

@NgModule({
  declarations: [
    WidgetPlayerComponent,
    WidgetPlayerDialogComponent,
    WidgetPlayerContainerComponent,
    GetDocumentFieldComponent
  ],

  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ComponentsModule,
    NgxWidgetGridModule,
    ReactiveFormsModule,
  ],

  exports: [
    WidgetPlayerComponent,
  ],

  entryComponents: [
    WidgetPlayerDialogComponent,
    WidgetPlayerContainerComponent,
  ]
})
export class WidgetPlayerModule { }
