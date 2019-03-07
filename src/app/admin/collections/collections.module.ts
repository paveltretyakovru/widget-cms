import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    CollectionComponent,
    CollectionsComponent,
    CollectionListComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    CollectionsRoutingModule,
  ],
  entryComponents: [
    DynamicFormComponent,
  ]
})
export class CollectionsModule { }
