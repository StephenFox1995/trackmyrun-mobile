import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Activity } from '../pages/activity/activity';
import { AuthService } from '../providers/auth-service';
import { StorageService } from '../providers/storage-service';
import { Login } from '../pages/login/login';
import { NewActivity } from '../pages/new-activity/new-activity';
import { ActivityDisplay } from '../pages/activity-display/activity-display'
import { Register } from '../pages/register/register';
import { TrackerService } from '../providers/tracker-service';
import { LocationService } from '../providers/location-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Register,
    ActivityDisplay,
    NewActivity,
    Activity
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Register,
    ActivityDisplay,
    NewActivity,
    Activity
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    StorageService,
    TrackerService,
    LocationService,
    Geolocation
  ]
})
export class AppModule {}
