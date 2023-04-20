import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { PostComponent } from './component/social/post/post.component';
import { CreatePostComponent } from './component/social/create-post/create-post.component';
=======
<<<<<<< HEAD
import { PostComponent } from './component/social/post/post.component';
import { CreatePostComponent } from './component/social/create-post/create-post.component';
=======
import { LoginComponent } from './component/author/login/login.component';
import { RegisterComponent } from './component/author/register/register.component';
import { ForgotpassComponent } from './component/author/forgotpass/forgotpass.component';
import { NavbarComponent } from './component/social/navbar/navbar.component';
>>>>>>> bdfcc976bf1b97f19d3b51edb38c0fb016b4a8ca
>>>>>>> 2d6b220aee9050767e996e83c4637326954991f3
=======
import { NavbarTourComponent } from './component/navbar-tour/navbar-tour.component';
>>>>>>> son

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    CreatePostComponent,
    PostComponent
=======
<<<<<<< HEAD
    CreatePostComponent,
    PostComponent
=======
    LoginComponent,
    RegisterComponent,
    ForgotpassComponent,
    NavbarComponent,
>>>>>>> bdfcc976bf1b97f19d3b51edb38c0fb016b4a8ca
>>>>>>> 2d6b220aee9050767e996e83c4637326954991f3
=======
    NavbarTourComponent,
>>>>>>> son
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
