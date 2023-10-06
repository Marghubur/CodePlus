import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(private http: HttpClient) { }

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
}
export interface ContentList {
  Id: number,
  Part: number,
  Type: string,
  FileName: string,
  Folder: string
}