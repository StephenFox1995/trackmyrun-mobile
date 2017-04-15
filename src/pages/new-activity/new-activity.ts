import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Activity } from '../activity/activity';
import { ActivityModel } from '../../models/activity-model';

/**
 * Generated class for the NewActivity page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-activity',
  templateUrl: 'new-activity.html',
})
export class NewActivity {
  private activityName = '';
  private activityType: any;
  private activity: ActivityModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController) {
      this.activity = new ActivityModel();
  }
  
  private showAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  
  startActivity() {
    if (!this.activityName) {
      this.showAlert('Please give a name for this activity');
      return
    }
    if (!this.activityType) {
      this.showAlert('Please select activity type');
      return
    }
    this.activity.setName(this.activityName);
    this.activity.setType(this.activityType);
    this.navCtrl.push(Activity, { 
      activity: this.activity
    });
  }  
}
