import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { mapLayer } from '../../helpers/url';
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
  activityName = 'Track My Run | New Activity';
  activityType: any;
  map: Leaflet.Map;
  center: Leaflet.PointTuple;
  marker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.center = [53.324034, -6.424026000000026];
    this.initMap();
  }
  
  initMap() {
    this.map = Leaflet.map('map', {
      center: this.center,
      zoom: 13
    });

    Leaflet.tileLayer(mapLayer, {
      attribution: '',
      maxZoom: 18
    }).addTo(this.map);
    
    this.marker = Leaflet
      .marker(this.center, { draggable: true })
      .addTo(this.map);  
  }

  startActivity() {
    this.navCtrl.push(Activity);
  }
}
