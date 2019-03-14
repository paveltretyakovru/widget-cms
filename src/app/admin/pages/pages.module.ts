import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWidgetGridModule } from 'ngx-widget-grid';

import { PageComponent } from './page/page.component';
import { PagesComponent } from './pages.component';
import { PageListComponent } from './page-list/page-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { WidgetSettingsComponent } from './page/shared/components/widget-settings/widget-settings.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { WidgetContainerComponent } from './page/shared/components/widget-container/widget-container.component';

@NgModule({
  declarations: [
    PageComponent,
    PagesComponent,
    PageListComponent,
    WidgetSettingsComponent,
    WidgetContainerComponent,
  ],

  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ComponentsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    NgxWidgetGridModule,
  ],

  entryComponents: [
    WidgetSettingsComponent,
    WidgetContainerComponent,
  ],
})
export class PagesModule { }
