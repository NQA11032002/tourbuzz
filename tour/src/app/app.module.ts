import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './component/blocks/header/header.component';
import { FooterComponent } from './component/blocks/footer/footer.component';

import { NavbarComponent } from './component/social/navbar/navbar.component';
import { CreatePostComponent } from './component/social/create-post/create-post.component';
import { PostComponent } from './component/social/post/post.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgotpassComponent } from './component/auth/forgotpass/forgotpass.component';
import { NavbarTourComponent } from './component/tours/navbar-tour/navbar-tour.component';
import { MessengerComponent } from './component/blocks/messenger/messenger.component';
import { ShortinfoComponent } from './component/social/shortinfo/shortinfo.component';
import { FullinfoComponent } from './component/social/fullinfo/fullinfo.component';
import { ListTourComponent } from './component/tours/list-tour/list-tour.component';
import { PostTourComponent } from './component/tours/post-tour/post-tour.component';
import { BookTourComponent } from './component/tours/book-tour/book-tour.component';

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
    MessengerComponent,
    ShortinfoComponent,
    FullinfoComponent,
    ListTourComponent,
    PostTourComponent,
    BookTourComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
