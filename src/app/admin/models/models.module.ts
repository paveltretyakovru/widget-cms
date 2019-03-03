import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ModelsRoutingModule } from './models-routing.module';
import { ModelsComponent } from './models.component';
import { MaterialModule } from 'src/app/material.module';
import { ModelComponent } from './model/model.component';
import { ModelListComponent } from './model-list/model-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
		ModelsComponent,
		ModelComponent,
		ModelListComponent,
		],
  imports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
    MaterialModule,
    ModelsRoutingModule,
		SharedModule,
  ]
})
export class ModelsModule { }
