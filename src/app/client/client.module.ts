import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [ClientComponent, LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
		
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    ClientRoutingModule,
  ],

	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientModule { }
