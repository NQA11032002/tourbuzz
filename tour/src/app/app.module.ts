import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/blocks/header/header.component';
import { FooterComponent } from './component/blocks/footer/footer.component';
import { CreatePostComponent } from './component/social/create-post/create-post.component';
import { PostComponent } from './component/social/post/post.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ForgotpassComponent } from './component/auth/forgotpass/forgotpass.component';
import { MessengerComponent } from './component/blocks/messenger/messenger.component';
import { ShortinfoComponent } from './component/social/shortinfo/shortinfo.component';
import { FullinfoComponent } from './component/social/fullinfo/fullinfo.component';
import { DetailstourComponent } from './component/tours/detailstour/detailstour.component';
import { ChangeinfoComponent } from './component/social/changeinfo/changeinfo.component';
import { PostTourComponent } from './component/tours/post-tour/post-tour.component';
import { BookTourComponent } from './component/tours/book-tour/book-tour.component';
import { AppRoutingModule } from './app-routing.module';
import { LayouttourComponent } from './component/layouttour/layouttour.component';
import { LayoutsocialComponent } from './component/layoutsocial/layoutsocial.component';
import { ResetpassComponent } from './component/social/resetpass/resetpass.component';
import { TourSearchComponent } from './component/tours/tour-search/tour-search.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { NavbarTourComponent } from './component/tours/navbar-tour/navbar-tour.component';

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
    NavbarTourComponent,
    MessengerComponent,
    ShortinfoComponent,
    FullinfoComponent,
    DetailstourComponent,
    ChangeinfoComponent,
    PostTourComponent,
    BookTourComponent,
    ResetpassComponent,
    LayouttourComponent,
    LayoutsocialComponent,
    TourSearchComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
