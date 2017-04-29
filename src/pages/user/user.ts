import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrackerService } from '../../providers/tracker-service';

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
  username: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private trackerService: TrackerService) {
    this.username = navParams.get('username');    
  }

  ionViewDidLoad() {
    
  }

  private triggerNetworkLoad() {
  }

}
