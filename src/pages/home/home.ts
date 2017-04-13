import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { TrackerService } from '../../providers/tracker-service';
import { ActivityDisplay } from '../activity-display/activity-display';
import { NewActivity } from '../new-activity/new-activity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  activities : any;
  loading: Loading;
  
  constructor(public navCtrl: NavController, public trackerService: TrackerService, public loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    this.showLoading();
    this.trackerService.getActivities()
      .subscribe(activities => {
        this.activities = activities;
        this.loading.dismiss();
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
}
