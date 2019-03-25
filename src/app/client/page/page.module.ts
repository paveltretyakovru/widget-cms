import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { GridModule } from 'src/app/shared/components/grid/grid.module';

@NgModule({
  declarations: [PageComponent],
  imports: [
    GridModule,
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
