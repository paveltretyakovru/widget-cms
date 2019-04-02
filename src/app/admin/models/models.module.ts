import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ModelsRoutingModule } from './models-routing.module';
import { ModelsComponent } from './models.component';
import { MaterialModule } from 'src/app/material.module';
import { ModelComponent } from './model/model.component';
import { ModelListComponent } from './model-list/model-list.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { RemoveButtonDialogComponent } from 'src/app/shared/components/remove-button/remove-button-dialog/remove-button-dialog.component';
import { RemoveButtonModule } from 'src/app/shared/components/remove-button/remove-button.module';

@NgModule({
  declarations: [
    ModelsComponent,
    ModelComponent,
    ModelListComponent,
  ],

  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    ComponentsModule,
    RemoveButtonModule,
    ReactiveFormsModule,
    ModelsRoutingModule,
  ],
})
export class ModelsModule { }
