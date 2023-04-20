import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/author/login/login.component';
import { RegisterComponent } from './component/author/register/register.component';
import { ForgotpassComponent } from './component/author/forgotpass/forgotpass.component';

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
