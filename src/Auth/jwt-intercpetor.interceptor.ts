import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/services/local.service';
import { masterkey } from 'src/util/constant';

@Injectable()
export class JwtIntercpetorInterceptor implements HttpInterceptor {

  constructor(private local: LocalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token =  this.local.getData(masterkey);
    if (token) {
      token = token.Token;
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(request);
  }
}
