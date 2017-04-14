import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Leaflet from "leaflet";

import { Activity } from '../activity/activity';


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
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  

  startActivity() {
    this.navCtrl.push(Activity);
  }
  
  
}
