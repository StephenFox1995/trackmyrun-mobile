import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrackerService } from '../../providers/tracker-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  activities : any;

  constructor(public navCtrl: NavController, public trackerService: TrackerService) {
    
  }

  ionViewDidLoad() {
    this.trackerService.getActivities()
      .subscribe(activities => this.activities = activities);
  }
}
