import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalService } from 'src/app/services/local.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private local: LocalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api

          this.local.clearData();
      }
      let error = null;
      if (err.error?.ResponseBody)
        error = err.error?.ResponseBody;
      else if (err.error?.StatusMessage)
        error = err.error?.StatusMessage;
      else
        error =  err.statusText;
      console.error(err);
      return throwError(() => error);
    }))
  }
}
