import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { mapLayer } from '../../helpers/url';
import L from 'leaflet';

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
  activityName = 'Track My Run| New Activity';
  activityType: any;
  map: L.Map;
  center: L.PointTuple;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.center = [48.77758, -92.73761];
    this.initMap();
  }
  
  initMap() {
    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    L.tileLayer(mapLayer, {
      attribution: '',
      maxZoom: 18
    }).addTo(this.map);
  }

}
