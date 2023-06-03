import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgotpassComponent } from './component/auth/forgotpass/forgotpass.component';
import { LayoutsocialComponent } from './component/layoutsocial/layoutsocial.component';
import { LayouttourComponent } from './component/layouttour/layouttour.component';
import { HomeComponent } from './component/home/home.component';
import { FullinfoComponent } from './component/social/fullinfo/fullinfo.component';
import { ResetpassComponent } from './component/social/resetpass/resetpass.component';
import { HistorybookingTourComponent } from './component/tours/historybooking-tour/historybooking-tour.component';
import { HistorypostTourComponent } from './component/tours/historypost-tour/historypost-tour.component';
import { AboutInforComponent } from './component/social/about-infor/about-infor.component';
import { PostPersonalComponent } from './component/social/post-personal/post-personal.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'social', component: LayoutsocialComponent},
  {path:'tour', component: LayouttourComponent},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'forgot-password', component: ForgotpassComponent},
  {path:'profile/:id_user', component: AboutInforComponent},
  {path:'historybooking', component: HistorybookingTourComponent},
  {path:'historyposttour', component: HistorypostTourComponent},
  {path:'profile/post/:id_user', component: PostPersonalComponent},
  {path:'**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
