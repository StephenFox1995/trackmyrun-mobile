import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { TrackerService } from '../../providers/tracker-service';
import { ActivityDisplay } from '../activity-display/activity-display';
import { NewActivity } from '../new-activity/new-activity';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  activities : any;
  private loading: Loading;
  
  constructor(
    public navCtrl: NavController, 
    public trackerService: TrackerService, 
    public loadingCtrl: LoadingController, 
    private alertCtrl: AlertController) { }

  ionViewDidLoad() {
    this.triggerNetworkLoad();
  }

  private triggerNetworkLoad() {
    this.showLoading();
    this.trackerService.getActivities()
      .subscribe(activities => {
        this.calculateTime(activities);
        this.activities = activities;
        this.loading.dismiss();
      }, err => {
        this.showError('Could not load activities');
      });
  }

  private calculateTime(activities) {
    activities = activities.map((activity) => {
      var start = moment(activity.properties.start);
      var end = moment(activity.properties.end);
      activity.properties['duration'] = moment(end.diff(start)).format("HH:mm:ss");
      return activity;
    });
  }


  newActivity(activityForDisplay) {
    this.navCtrl.push(NewActivity);
  }
  
  showActivity(activityForDisplay) {
    this.navCtrl.push(ActivityDisplay, { activity: activityForDisplay });
  }
  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading activities...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  refresh() {
    this.triggerNetworkLoad();
  }
}
