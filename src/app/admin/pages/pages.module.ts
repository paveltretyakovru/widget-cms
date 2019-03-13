import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWidgetGridModule } from 'ngx-widget-grid';

import { PageComponent } from './page/page.component';
import { PagesComponent } from './pages.component';
import { PageListComponent } from './page-list/page-list.component';

import { FormsModule } from '@angular/forms';
import { WidgetsModule } from 'src/app/shared/components/widgets/widgets.module';
import { MaterialModule } from 'src/app/material.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    PageComponent,
    PagesComponent,
    PageListComponent,
  ],

  imports: [
    FormsModule,
    CommonModule,
    WidgetsModule,
    MaterialModule,
    PagesRoutingModule,
    NgxWidgetGridModule,
  ],
})
export class PagesModule { }
