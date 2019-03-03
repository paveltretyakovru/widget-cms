import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material.module';
import { PanelComponent } from './shared/components/panel/panel.component';

@NgModule({
  declarations: [ AdminComponent, PanelComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AdminModule { }
