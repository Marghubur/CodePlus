import { Component } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';
import { Login } from 'src/util/constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private http:AjaxService,
              private router: Router) {}

  forgotPassword() {
    let value = (<HTMLInputElement>document.getElementById("email")).value;
    if (value) {
      this.http.post("User/ForgotPassword", value).subscribe((res:any) => {
        if (res.ResponseBody) {
          console.log("Password is send in your register email");
          this.router.navigateByUrl(Login)
        }
      }, (error) => {
        console.log(error);
      })
    } else {
      console.log("Please enter email")
    }
  }
}
