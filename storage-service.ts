import { Injectable } from '@angular/core';
import * as localforage from "localforage";

@Injectable()
export class StorageService {

  constructor() { 
    localforage.config({
      name: 'MyApp'
    });
  }
  async setItem(key: string, value: string) {
    let result = await localforage.setItem(key, value).then((item) => {
      return item;
    });
    return result;
  }    
  async getItem(key: string){
    let result = await localforage.getItem(key).then((item) => {
      return item;
    });
    return result;
  }
  async clear():Promise<void> {
    return await localforage.clear();
  }
}
