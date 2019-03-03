import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWidgetGridModule } from 'ngx-widget-grid';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PageComponent } from './page/page.component';
import { PageListComponent } from './page-list/page-list.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PagesComponent, PageComponent, PageListComponent],
  imports: [
    FormsModule,
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    NgxWidgetGridModule,
  ]
})
export class PagesModule { }
