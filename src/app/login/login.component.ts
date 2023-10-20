import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor (private fb: FormBuilder,
              private common: CommonService,
              private router: Router,
              private http: AjaxService,
              private local: LocalService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      Email: new FormControl("", [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.common.loader(true);
    if (this.loginForm.invalid) {
      this.common.error("Invalid form")
      this.common.loader(false);
      return;
    }
    let value = this.loginForm.value;
    this.http.login("User/Login", value).subscribe((res: any) => {
      if (res.ResponseBody) {
        let user = res.ResponseBody;
        this.common.success("Login successfully");
        this.common.loader(false);
        this.local.saveData(user);
        this.router.navigate(['/home'])
      }
    }, (err) => {
      this.common.loader(false);
      this.common.error(err.error.StatusMessage);
    })
  }
  
}
