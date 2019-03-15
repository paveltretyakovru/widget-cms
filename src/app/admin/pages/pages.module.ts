import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageComponent } from './page/page.component';
import { PagesComponent } from './pages.component';
import { PageListComponent } from './page-list/page-list.component';
import { WidgetSettingsComponent } from './page/shared/components/widget-settings/widget-settings.component';
import { WidgetContainerComponent } from './page/shared/components/widget-container/widget-container.component';

import { MaterialModule } from 'src/app/material.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PagesRoutingModule } from './pages-routing.module';
import { WidgetEditorModule } from './page/shared/components/widget-editor/widget-editor.module';
import { WidgetViewerModule } from './page/shared/components/widget-viewer/widget-viewer.module';

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
    WidgetViewerModule,
    WidgetEditorModule,
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
