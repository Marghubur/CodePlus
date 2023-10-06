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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent, data: {breadcrumb: "Home"}},
  {path: 'blog/view', component: ViewContentComponent, data: {breadcrumb: "View"}},
  {path: 'blog/editor', component: EditorComponent, data: {breadcrumb: "Editor"}, canActivate: [AuthguardGuard]},
  {path: 'blog/content', component: ContentListComponent, data: {breadcrumb: "Content"}, canActivate: [AuthguardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
