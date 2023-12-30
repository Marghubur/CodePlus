import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit{
  changePasswordForm: FormGroup;
  currentUser: any= null;
  constructor(private http: AjaxService,
              private fb: FormBuilder,
              private common: CommonService,
              private local:LocalService,
              private router: Router){}

  ngOnInit(): void {
    this.currentUser = this.common.getUser();
    this.initForm();
  }

  initForm() {
    this.changePasswordForm = this.fb.group({
      Password: new FormControl("", [Validators.required]),
      NewPassword: new FormControl("", [Validators.required]),
      ConfirmPassword: new FormControl("", [Validators.required]),
      OTP: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
    }, {
      Validators: this.passwordMatchValidator
    });
  }

  getOTP() {
    if (this.currentUser) {
      this.common.loader(true);
      this.http.get(`User/GenerateOTP/${this.currentUser.Email}`).subscribe((res: any) => {
        if (res.ResponseBody) {
          this.common.success(res.ResponseBody);
          this.common.loader(false);
        }
      }, (err) => {
        this.common.loader(false);
        this.common.error(err);
      })
    }
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('Password').value;
    const confirmPassword = control.get('ConfirmPassword').value;

    if (password !== confirmPassword) {
      control.get('ConfirmPassword').setErrors({ passwordMismatch: true });
    } else {
      return null;
    }
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  submit() {
    if (this.changePasswordForm.invalid) {
      this.common.error("Invalid detail");
      return;
    }

    this.common.loader(true);
    let value = this.changePasswordForm.value;
    value.UserId = this.currentUser.UserId;
    value.Email = this.currentUser.Email;
    this.http.post("User/ChangePassword", value).subscribe((res: any) => {
      if (res.ResponseBody) {
        this.common.success("Password changed successfully");
        this.common.loader(false);
        this.local.clearData();
        this.router.navigate(['/login']);
      }
    }, (err) => {
      this.common.loader(false);
      this.common.error(err);
    })
  }
}
