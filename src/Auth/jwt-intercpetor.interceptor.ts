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
import { JwtService } from 'src/app/services/jwt.service';

@Injectable()
export class JwtIntercpetorInterceptor implements HttpInterceptor {

  constructor(private local: LocalService,
              private jwt: JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token =  this.local.getData(masterkey);
    if (token && !this.jwt.isTokenExpired()) {
      token = token.Token;
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(request);
  }
}
