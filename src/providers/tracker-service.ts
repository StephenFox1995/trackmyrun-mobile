import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { activityEnpoint, defaultHeaders } from '../helpers/url';
import { AuthService } from '../providers/auth-service';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the TrackerService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TrackerService {

  constructor(public http: Http, public authService: AuthService) { }
  
  public getActivities() {
    return Observable.create(observer => {
      let endpoint = activityEnpoint;
      let headers = defaultHeaders();
      this.authService.getToken().subscribe(token => {
        headers.append('Authorization', `Token ${token}`)
        this.http.get(endpoint, { headers: headers })
          .map(res => ({ features: res.json().features }))
          .subscribe(activities => {
            observer.next(activities.features);
          }, 
          err => {
            observer.error(err);
          });
      });
    })
  }

  public uploadActivity(activity) {
    let headers = defaultHeaders();
    let endpoint = activityEnpoint;
    return new Promise((res, rej) => {
      this.authService.getToken().subscribe(token => {
        headers.append('Authorization', `Token ${token}`)
        this.http.post(endpoint, activity, { headers: headers })
          .subscribe(res, rej)
      })
    });
  }
}
