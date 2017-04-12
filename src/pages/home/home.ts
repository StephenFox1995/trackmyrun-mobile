import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { TrackerService } from '../../providers/tracker-service';
import { ActivityDisplay } from '../activity-display/activity-display'

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

  newActivity() {
    console.log('lets start new activity');
  }
  
  showActivity() {
    this.navCtrl.push(ActivityDisplay);
  }
  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading activities...'
    });
    this.loading.present();
  }
}
