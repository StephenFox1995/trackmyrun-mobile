import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login'
import { AuthService } from '../providers/auth-service';

import 'rxjs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = Login;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      authService.getToken()
        .subscribe(token => {

        }, error => {

        });
    });
  }
}

