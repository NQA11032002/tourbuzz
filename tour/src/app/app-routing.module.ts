import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgotpassComponent } from './component/auth/forgotpass/forgotpass.component';
import { LayoutsocialComponent } from './component/layoutsocial/layoutsocial.component';
import { LayouttourComponent } from './component/layouttour/layouttour.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path:'', component: LayouttourComponent},
  {path:'social', component: LayoutsocialComponent},
  {path:'tour', component: LayouttourComponent},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'**', component: LayouttourComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
