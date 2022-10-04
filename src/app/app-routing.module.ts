import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';



const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => {
      return import('./layout/layout.module').then((m) => m.LoyoutModule);
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
