import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NotificationType, Notification } from 'src/util/intrface';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  notifications: Array<Notification> = [];  

  constructor(private _notificationService: CommonService){
    this._notificationService.getAlert().subscribe((alert: Notification) => {  
      this.notifications = [];  
      if (!alert) {  
          this.notifications = [];  
          return;  
      }  
      this.notifications.push(alert);  
      setTimeout(() => {  
          this.notifications = this.notifications.filter(x => x !== alert);  
      }, 4000);  
  }); 
  }

  ngOnInit(): void {

  }

  removeNotification(notification: Notification) {  
    this.notifications = this.notifications.filter(x => x !== notification);  
}

  cssClass(notification: Notification) {  
    if (!notification) {  
        return;  
    }  
    switch (notification.type) {  
        case NotificationType.Success:  
            return 'toast-success';  
        case NotificationType.Error:  
            return 'toast-error';  
        case NotificationType.Info:  
            return 'toast-info';  
        case NotificationType.Warning:  
            return 'toast-warning';  
    }  
  }  
}
