import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from 'src/app/shared/helpers/error.interceptor';
import { JwtInterceptor } from 'src/app/shared/helpers/jwt.interceptor';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { LoaderInterceptor } from 'src/app/shared/helpers/loader.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';

export const APP_ID = 'my-app';

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,

    BrowserModule.withServerTransition({ appId: APP_ID }),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],

  exports: [
    AppRoutingModule,
    LoaderComponent,
  ],

  bootstrap: [
    AppComponent,
  ],

  declarations: [
    LoaderComponent,
    SnackBarComponent,
  ],

  providers: [
    SnackBarComponent,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
