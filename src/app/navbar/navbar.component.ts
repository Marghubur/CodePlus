import { Component, DoCheck } from '@angular/core';
import { NavMenu } from 'src/util/constant';
import { LocalService } from '../services/local.service';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements DoCheck {
  menu: Array<any> = NavMenu;
  isAdmin: boolean = false;
  isLogIn: boolean = false;

  constructor(private local:LocalService,
              private common: CommonService,
              private router: Router) {}
  ngDoCheck(): void {
    this.isAdmin = this.common.isAdmin();
    this.isLogIn = this.common.isLogIn();
  }

  logOut() {
    this.common.success("logout successfully");
    this.local.clearData();
    this.router.navigate(['/home'])
  }
}
