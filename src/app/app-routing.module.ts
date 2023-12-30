import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewContentComponent } from './view-content/view-content.component';
import { EditorComponent } from './editor/editor.component';
import { ContentListComponent } from './content-list/content-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthguardGuard } from 'src/Auth/authguard.guard';
import { Article, BlogContent, BlogEditor, BlogView, Book, ChnagePassword, ForgotPassword, Home, Links, Login, MyNotes, SignUp, Video } from 'src/util/constant';
import { VideoComponent } from './video/video.component';
import { BookComponent } from './book/book.component';
import { ArticlesComponent } from './articles/articles.component';
import { LinksComponent } from './links/links.component';
import { MynotesComponent } from './mynotes/mynotes.component';
import { RoleGuard } from 'src/Auth/role.guard';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: Home, component: HomeComponent, data: {breadcrumb: "Home"}},
  {path: BlogView, component: ViewContentComponent, data: {breadcrumb: "View"}},
  {path: BlogEditor, component: EditorComponent, data: {breadcrumb: "Editor"}, canActivate: [AuthguardGuard]},
  {path: BlogContent, component: ContentListComponent, data: {breadcrumb: "Content"}, canActivate: [AuthguardGuard]},
  {path: MyNotes, component: MynotesComponent, data: {breadcrumb: "MyNotes"}, canActivate: [RoleGuard]},
  {path: Login, component: LoginComponent},
  {path: SignUp, component: SignupComponent},
  {path: ForgotPassword, component: ForgotPasswordComponent},
  {path: Video, component: VideoComponent},
  {path: Article, component: ArticlesComponent},
  {path: Book, component: BookComponent},
  {path: Links, component: LinksComponent}, 
  {path: ChnagePassword, component: ChangepasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
