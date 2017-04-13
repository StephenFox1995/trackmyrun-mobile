import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the Activity page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class Activity {
  activityTime: any;
  private startTime: number;
  private endTime: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.startTimer();
  }

  startTimer() {
    this.startTime = Date.now();
    Observable
      .interval(100)
      .timeInterval()
      .subscribe(total => {
        this.activityTime = total.value;
      });
  }

  private humanReadableTime(time) {
    return time.toISOString().slice(14, 22);
  }
  
  stopTimer() {
    this.endTime = Date.now();
  }
}
