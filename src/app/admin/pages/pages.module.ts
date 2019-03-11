import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWidgetGridModule } from 'ngx-widget-grid';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PageComponent } from './page/page.component';
import { PageListComponent } from './page-list/page-list.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from 'src/app/shared/components/widgets/widgets.module';
import { HeadlineComponent } from 'src/app/shared/components/widgets/widgets-panel/widgets-panel.component';

@NgModule({
  declarations: [PagesComponent, PageComponent, PageListComponent],
  imports: [
    FormsModule,
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    NgxWidgetGridModule,
    WidgetsModule,
  ],
  entryComponents: [ HeadlineComponent ]
})
export class PagesModule { }
