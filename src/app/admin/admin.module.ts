import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material.module';
import { PanelComponent } from './shared/components/panel/panel.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ AdminComponent, PanelComponent ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AdminModule { }
