import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

export const APP_ID = 'my-app';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: APP_ID }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [ AppRoutingModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
