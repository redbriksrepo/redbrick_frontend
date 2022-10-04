import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const electron = (<any>window);
// const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class ElectronApiService {

  macAddress: any;
  constructor() { }

  getMacAddress = async() => {
    let macAddress = await electron.electronAPI.getMac().then((data: any) => {
      return data;
    })
    return macAddress;
  }

  // MacAddress = new Observable((subscriber) => {

  // })
}