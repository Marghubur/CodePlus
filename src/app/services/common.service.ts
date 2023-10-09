import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalService } from './local.service';
import { masterkey } from 'src/util/constant';
import { Role } from 'src/util/intrface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(private http: HttpClient,
              private local: LocalService) { }

  loader(status: boolean) {
    this.isLoading.next(status);
  }

  getContentList() {
    return this.http.get("assets/content-detail.json");
  }

  readTxtFile(folder: string, fileName: string) {
    if (fileName) {
      return this.http.get(`assets/${folder}/${fileName}.txt` , { responseType: 'text' });
    }
  }

  isAdmin(): boolean {
    let flag = false;
    let data = this.local.getData(masterkey);
    if (data && data.user && data.user.UsertypeId == Role.Admin)
      flag = true;

    return flag;
  }

  isLogIn() {
    let flag = false;
    let data = this.local.getData(masterkey);
    if (data)
      flag = true;

    return flag;
  }
}
export interface ContentList {
  Id: number,
  Part: number,
  Type: string,
  FileName: string,
  Folder: string
}