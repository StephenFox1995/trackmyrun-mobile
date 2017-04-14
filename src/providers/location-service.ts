import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Observable";
/*
  Generated class for the LocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class LocationService {

  constructor(public http: Http, public geolocation: Geolocation) {
  }
  
  getCurrentLocation() {
    return Observable.create(observer => {
      this.geolocation.getCurrentPosition().then(location => {
        observer.next({
          lat: location.coords.latitude, 
          lng: location.coords.longitude 
        });
      }).catch(err => observer.error(err));
    });
  }

  watchLocation() {
    return Observable.create(observer => {
      this.geolocation.watchPosition()
      .filter(location => location !== undefined)
      .map(location => ({ lat: location.coords.latitude, lng: location.coords.longitude }))
      .subscribe(coords => {
        observer.next(coords);
      }, 
      err => observer.error(err));
    });
  }
}
