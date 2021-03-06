import { Component, enableProdMode } from '@angular/core';
import { Platform,  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login'
import { AuthService } from '../providers/auth-service';

import 'rxjs';

enableProdMode();

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authService: AuthService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      
      authService.getToken()
        .subscribe(token => {
          if (token) {
            this.rootPage = HomePage;
          }
        }, error => {
          this.rootPage = Login;
        });
    });
  }
}

