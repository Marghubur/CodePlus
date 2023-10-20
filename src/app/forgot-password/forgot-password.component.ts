import { Component } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';
import { Login } from 'src/util/constant';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private http:AjaxService,
              private router: Router,
              private common: CommonService) {}

  forgotPassword() {
    let value = (<HTMLInputElement>document.getElementById("email")).value;
    if (value) {
      this.http.get(`User/ForgotPassword/${value}`).subscribe((res:any) => {
        if (res.ResponseBody) {
          this.common.error("Password is send in your register email");
          this.router.navigateByUrl(Login)
        }
      }, (error) => {
        this.common.error(error);
      })
    } else {
      this.common.error("Please enter email")
    }
  }
}
