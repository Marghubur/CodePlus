import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { masterkey } from 'src/util/constant';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(value: any) {
    if (value) {
      if (typeof(value) !== "string")
        value = JSON.stringify(value);

      sessionStorage.setItem(masterkey, value);
    }
  }

  public getData(key: string) {
    let data = sessionStorage.getItem(key) || "";
    if (data)
      return JSON.parse(data);
    
    return null;
  }
  
  public removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  public clearData() {
    sessionStorage.clear();
  }

}
