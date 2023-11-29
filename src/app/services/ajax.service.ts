import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  //baseUrl: string = "http://localhost:7500/api/";
  //baseUrl: string = "//codeplus.somee.com/api/";
  baseUrl: string = "https://marghub.bsite.net/api/";
  // imgBaseUrl: string = "http://localhost:7500/";
  //imgBaseUrl: string = "//codeplus.somee.com/";
  imgBaseUrl: string = "https://marghub.bsite.net/";
  
  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(this.baseUrl + url);
  }

  post(url: string, data: any) {
    return this.http.post(this.baseUrl + url, data);
  }

  login(url: string, data: any) {
    return this.http.post(this.baseUrl + url, data);
  }
}
