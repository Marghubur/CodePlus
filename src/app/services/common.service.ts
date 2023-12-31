import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LocalService } from './local.service';
import { masterkey } from 'src/util/constant';
import { NotificationType, Role, Notification } from 'src/util/intrface';
import { NavigationStart, Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public subject = new Subject<Notification>();  
  keepAfterRouteChange = true;  
  
  constructor(private router: Router,
              private local: LocalService,
              private jwt: JwtService) {  
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true  
    router.events.subscribe(event => {  
        if (event instanceof NavigationStart) {  
            if (this.keepAfterRouteChange) {  
                // only keep for a single route change  
                this.keepAfterRouteChange = false;  
            } else {  
                // clear alert messages  
                this.clear();  
            }  
        }  
    });  
}

  loader(status: boolean) {
    this.isLoading.next(status);
  }

  isAdmin(): boolean {
    let flag = false;
    let data = this.local.getData(masterkey);
    if (data && data.User && data.User.UsertypeId == Role.Admin)
      flag = true;

    return flag;
  }

  isLogIn() {
    let flag = false;
    let data = this.local.getData(masterkey);
    if (data && data.Token)
      flag = true;

    return this.jwt.isTokenExpired;
  }

  getUser() {
    let data = this.local.getData(masterkey);
    if (data && data.User)
      return data.User;

    return null;
  }

  getAlert(): Observable<any> {  
    return this.subject.asObservable();  
  }
  
  clear() {  
    this.subject.next(null); 
  } 

  success(message: string, keepAfterRouteChange = false) {  
    this.showNotification(NotificationType.Success, message, keepAfterRouteChange);  
  }  

  error(message: string, keepAfterRouteChange = false) {  
      this.showNotification(NotificationType.Error, message, keepAfterRouteChange);  
  }  

  info(message: string, keepAfterRouteChange = false) {  
      this.showNotification(NotificationType.Info, message, keepAfterRouteChange);  
  }  

  warn(message: string, keepAfterRouteChange = false) {  
      this.showNotification(NotificationType.Warning, message, keepAfterRouteChange);  
  }  

  private showNotification(type: NotificationType, message: string, keepAfterRouteChange = false) {  
      this.keepAfterRouteChange = keepAfterRouteChange;  
      this.subject.next(<Notification>{ type: type, message: message });  
  } 
}
export interface ContentList {
  Id: number,
  Part: number,
  Type: string,
  FileName: string,
  Folder: string
}