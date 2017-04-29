import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { activityEnpoint, defaultHeaders, activityForUserEndpoint } from '../helpers/url';
import { AuthService } from '../providers/auth-service';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the TrackerService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TrackerService {

  constructor(
    private http: Http, 
    private authService: AuthService) { }
  
  public getActivities(forUser=false) {
    return Observable.create(observer => {
      var endpoint = null;
      if (forUser) {
        endpoint = activityForUserEndpoint;
      } else {
        endpoint = activityEnpoint;
      }
      
      let headers = defaultHeaders();
      this.authService.getToken().subscribe(token => {
        headers.append('Authorization', `Token ${token}`)
        this.http.get(endpoint, { headers: headers })
          .map(res => res.json())
          .subscribe(activities => {
            observer.next(activities);
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
