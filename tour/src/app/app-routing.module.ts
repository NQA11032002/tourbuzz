import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgotpassComponent } from './component/auth/forgotpass/forgotpass.component';
import { LayoutsocialComponent } from './component/layoutsocial/layoutsocial.component';
import { LayouttourComponent } from './component/layouttour/layouttour.component';
import { HomeComponent } from './component/home/home.component';
import { AboutInforComponent } from './component/social/about-infor/about-infor.component';
import { HistorybookingTourComponent } from './component/tours/historybooking-tour/historybooking-tour.component';
import { HistorypostTourComponent } from './component/tours/historypost-tour/historypost-tour.component';
import { FriendsComponent } from './component/social/friends/friends.component';
import { DetailstourComponent } from './component/tours/detailstour/detailstour.component';
import { ImagesComponent } from './component/social/images/images.component';
import { PostTourComponent } from './component/tours/post-tour/post-tour.component';
import { LayoutmanagertourComponent } from './component/layoutmanagertour/layoutmanagertour.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'social', component: LayoutsocialComponent},
  {path:'tour', component: LayouttourComponent},
  {path:'tour-detail', component: DetailstourComponent},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'forgot-password', component: ForgotpassComponent},
  {path:'profile', component: AboutInforComponent},
  {path:'profile/friends', component: FriendsComponent},
  {path:'profile/images', component: ImagesComponent},
  {path:'historybooking', component: HistorybookingTourComponent},
  {path:'historyposttour', component: HistorypostTourComponent},
  {path:'postTour',component: PostTourComponent},
  {path:'manager/tours', component: LayoutmanagertourComponent},
  {path:'manager/addition', component: LayoutmanagertourComponent},
  {path:'manager/booking', component: LayoutmanagertourComponent},

  {path:'**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
