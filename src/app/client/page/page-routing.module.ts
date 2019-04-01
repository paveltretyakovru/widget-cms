import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';

const routes: Routes = [
  { path: '', component: PageComponent },
  { path: ':id', component: PageComponent },
  { path: ':id/l/:list', component: PageComponent },
  { path: ':id/d/:document', component: PageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
