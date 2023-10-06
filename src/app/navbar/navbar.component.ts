import { Component } from '@angular/core';
import { NavMenu } from 'src/util/constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menu: Array<any> = NavMenu;
}
