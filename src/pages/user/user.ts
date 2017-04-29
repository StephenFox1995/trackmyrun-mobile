import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { TrackerService } from '../../providers/tracker-service';
import { ActivityModel } from '../../models/activity-model';

/**
 * Generated class for the User page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class User {
  
  private owner: any;
  activities: Array<ActivityModel>;
  private loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private trackerService: TrackerService,
    public loadingCtrl: LoadingController, 
    private alertCtrl: AlertController) {
    this.owner = navParams.get('owner');   
  }

  ionViewDidLoad() {
    this.triggerNetworkLoad();
  }

  private triggerNetworkLoad() {
    this.showLoading();
    this.trackerService.getActivities(this.owner.id)
      .subscribe(activities => {
        this.activities = ActivityModel.fromFeatureCollection(activities);
        this.loading.dismiss();
      }, err => {
        this.showError(`Could not load activities for ${this.owner.username}`);
      });
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

}
