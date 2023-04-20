import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgotpassComponent } from './component/auth/forgotpass/forgotpass.component';

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'forgotpass', component: ForgotpassComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
