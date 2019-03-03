import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PageComponent } from './page/page.component';
import { PageListComponent } from './page-list/page-list.component';

@NgModule({
  declarations: [PagesComponent, PageComponent, PageListComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
