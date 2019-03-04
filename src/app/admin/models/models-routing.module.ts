import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelsComponent } from './models.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelComponent } from './model/model.component';

const routes: Routes = [
  {
    path: '',
    component: ModelsComponent,
    children: [
      {
        path: '',
        component: ModelListComponent
      },
      {
        path: 'add',
        component: ModelComponent,
      },
      {
        path: ':id',
        component: ModelComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelsRoutingModule { }
