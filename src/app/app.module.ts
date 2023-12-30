import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { ViewContentComponent } from './view-content/view-content.component';
import { EditorComponent } from './editor/editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { ContentListComponent } from './content-list/content-list.component';
import { LoginComponent } from './login/login.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VideoComponent } from './video/video.component';
import { BookComponent } from './book/book.component';
import { ArticlesComponent } from './articles/articles.component';
import { LinksComponent } from './links/links.component';
import { JwtIntercpetorInterceptor } from 'src/Auth/jwt-intercpetor.interceptor';
import { ToastComponent } from './toast/toast.component';
import { ErrorInterceptor } from 'src/Auth/error.interceptor';
import { MynotesComponent } from './mynotes/mynotes.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoaderComponent,
    FooterComponent,
    ViewContentComponent,
    EditorComponent,
    ContentListComponent,
    LoginComponent,
    BreadcrumbComponent,
    SignupComponent,
    ForgotPasswordComponent,
    VideoComponent,
    BookComponent,
    ArticlesComponent,
    LinksComponent,
    ToastComponent,
    MynotesComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule ,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtIntercpetorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
