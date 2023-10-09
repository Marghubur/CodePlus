import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { AjaxService } from '../services/ajax.service';
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor (private fb: FormBuilder,
              private common: CommonService,
              private router: Router,
              private http: AjaxService,
              private local: LocalService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      Email: new FormControl("", [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
      UserName: new FormControl('', [Validators.required])
    })
  }

  register() {
    this.common.loader(true);
    if (this.signupForm.invalid) {
      console.log("Invalid form")
      this.common.loader(false);
      return;
    }
    let value = this.signupForm.value;
    this.http.post("User/UserRegistration", value).subscribe((res: any) => {
      if (res.ResponseBody) {
        this.common.loader(false);
        this.router.navigate(['/home']);
      }
    }, (err) => {
      this.common.loader(false);
      console.log("Email or password is not matched");
    })
  }
}
