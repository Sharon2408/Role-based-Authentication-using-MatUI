import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { authGaurdGuard } from 'src/Guard/auth-gaurd.guard';
import { AssignTasksComponent } from './assign-tasks/assign-tasks.component';

const routes: Routes = [
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'task',component:AssignTasksComponent, canActivate:[authGaurdGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
