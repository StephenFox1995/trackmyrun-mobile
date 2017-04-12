import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import L from 'leaflet';

import { mapbox } from '../../helpers/url';
import { LocationService } from '../../providers/location-service';

/**
 * Generated class for the ActivityDisplay page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-activity-display',
  templateUrl: 'activity-display.html',
})
export class ActivityDisplay {
  map: L.Map;
  center: L.PointTuple;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationService: LocationService) {
  }

  ionViewDidLoad() {
    this.initMap();
    this.center = [48.77758, -92.73761];
    this.locationService.getCurrentLocation()
      .subscribe((lat, lng) => {
        this.center = [lat, lng];
    }, (error) => {
      console.log('An error occurred tracking location');
    });
    
  }

  initMap() {
    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    L.tileLayer(mapbox, {
      attribution: '',
      maxZoom: 18
    }).addTo(this.map);
  }

}
