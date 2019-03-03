import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [ WelcomeComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    WelcomeRoutingModule,
  ],
})
export class WelcomeModule { }
