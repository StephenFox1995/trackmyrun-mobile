import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrackerService } from '../../providers/tracker-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public trackerService: TrackerService) {
    
  }

  ionViewDidLoad() {
    console.log('hekeokfopewkfopewkfopwekjfpoewjfp')
    this.trackerService.getActivities();
  }

}
