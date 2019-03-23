import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageComponent } from './page/page.component';
import { PagesComponent } from './pages.component';
import { PageListComponent } from './page-list/page-list.component';

import { MaterialModule } from 'src/app/material.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PagesRoutingModule } from './pages-routing.module';
import { GridModule } from 'src/app/shared/components/grid/grid.module';

@NgModule({
  declarations: [
    PageComponent,
    PagesComponent,
    PageListComponent,
  ],

  imports: [
    GridModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    ComponentsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    NgxWidgetGridModule,
  ],
})
export class PagesModule { }
