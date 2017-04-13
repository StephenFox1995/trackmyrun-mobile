import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageService {
  
  storage: Storage;
  constructor(public http: Http, storage: Storage) {
    this.storage = storage;
  }

  /**
   * Store a key value pair.
   * @param key The key
   * @param value The value to store
   */
  public store(key, value) {
    return Observable.create(observer => {
      this.storage.ready().then(
        () => {
          this.storage.set(key, value);
          observer.next(true);
          console.log('token was saved');
        }).catch((err) => {
          console.log(err);
        });
    });
  }

  /**
   * Retrieve key value pair from database.
   * @param key The key of the item to retrieve
   */
  public get(key) {
    console.log('trying to get token');
    return Observable.create(observer => {
      this.storage.get(key).then(
        val => { 
          if (val === null) {
            observer.error(new Error('No token on device'));  
          } else {
            observer.next(val);
          }
        },
        err => { 
          observer.error(err);
        });
    })
  }
}
