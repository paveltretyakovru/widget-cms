import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { LoginComponent } from './client/login/login.component';
import { RegistrationComponent } from './client/registration/registration.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'p' },
  { path: 'p', loadChildren: './client/client.module#ClientModule' },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivateChild: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: true,
    }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
