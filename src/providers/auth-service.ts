import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenAuthEndpoint, registerEndpoint, defaultHeaders } from '../helpers/url'
import { StorageService} from './storage-service';
import 'rxjs';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class User {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;

  constructor(username: string, email: string, firstname: string, lastname: string, password: string) {
    this.username = username;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
  }

  public forRegister() {
    return {
      username: this.username,
      email: this.email,
      first_name: this.firstname,
      last_name: this.lastname,
      password: this.password
    }
  }
}



@Injectable()
export class AuthService {
  tokenKey = 'token';
  currentUser: User;
  token: string;
  storageService: StorageService;

  constructor(public http: Http, storageService: StorageService) {
    this.http = http;
    this.storageService = storageService
  }

  public login(credential) {
    if (credential.username === null || credential.password === null) {
      return Observable.throw('Please fill all inputs');
    }
    return this.loginRequest(credential.username, credential.password)
  }

  loginRequest(username, password) {
    return Observable.create(observer => {
      let authEndpoint = tokenAuthEndpoint(username, password)
      this.http.get(authEndpoint)
        .map(res => res.json().token)
        .map(token => {
          this.saveToken(token)
        })
        .subscribe(saved => {
          observer.next(true);
        }, err => {
          observer.next(false);
        })
    })
  }

  public register(credentials) {
    if (this.passwordsMatch(credentials.password, credentials.passwordMatch)) {
      let user = new User(credentials.username, credentials.email, credentials.firstname, credentials.lastname, credentials.password);
      return this.registerRequest(user);
    } else {
      return Observable.throw('Passwords must match');
    }
  }

  registerRequest(user) {
    let regEndpoint = registerEndpoint;
    let postData = user.forRegister();
    return this.http.post(regEndpoint, postData, { headers: defaultHeaders() });
  }

  public passwordsMatch(password1, password2) {
    return password1 === password2;
  }

  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  public getToken() {
    return this.storageService.get(this.tokenKey)
  }

  saveToken(token) {
    return this.storageService.store(this.tokenKey, token);
  }
}
