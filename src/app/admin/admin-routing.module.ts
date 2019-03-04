import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PanelComponent } from './shared/components/panel/panel.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component:  AdminComponent,
    children: [
      {
        path: '',
        component: PanelComponent,
      },
      {
        path: 'models',
        loadChildren: './models/models.module#ModelsModule',
      },
      {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule',
      },
      {
        path: 'collections',
        loadChildren: './collections/collections.module#CollectionsModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
