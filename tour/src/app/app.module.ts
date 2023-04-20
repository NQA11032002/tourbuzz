import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './component/blocks/header/header.component';
import { FooterComponent } from './component/blocks/footer/footer.component';

import { NavbarComponent } from './component/social/navbar/navbar.component';
import { NavbarTourComponent } from './component/tour/navbar-tour/navbar-tour.component';
import { CreatePostComponent } from './component/social/create-post/create-post.component';
import { PostComponent } from './component/social/post/post.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgotpassComponent } from './component/auth/forgotpass/forgotpass.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreatePostComponent,
    PostComponent,
    PostComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpassComponent,
    NavbarComponent,
    NavbarTourComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
