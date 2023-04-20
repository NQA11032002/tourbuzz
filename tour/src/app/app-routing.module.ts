import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
<<<<<<< HEAD

const routes: Routes = [];
=======
import { LoginComponent } from './component/author/login/login.component';
import { RegisterComponent } from './component/author/register/register.component';
import { ForgotpassComponent } from './component/author/forgotpass/forgotpass.component';

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'forgotpass', component: ForgotpassComponent},
];
>>>>>>> 2d6b220aee9050767e996e83c4637326954991f3
=======

const routes: Routes = [];
>>>>>>> son

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
