import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { mapLayer } from '../../helpers/url';
import * as Leaflet from "leaflet";

import { Activity } from '../activity/activity';
import { LocationService } from '../../providers/location-service';

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
  private activityName = 'Track My Run | New Activity';
  private activityType: any;
  private map: Leaflet.Map;
  private marker: Leaflet.Marker;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private locationService: LocationService) {
  }

  ionViewDidLoad() {
    console.log('gonna get location');
    this.locationService.getCurrentLocation()
      .subscribe((location) => {
        this.updateLocation([location.lat, location.lng]);
      }, err => {
        console.log('could not located user');
      })
    this.initMap();
  }
  
  private initMap() {
    this.map = Leaflet.map('map', {
      center: [0, 0],
      zoom: 16
    });

    Leaflet.tileLayer(mapLayer, {
      attribution: '',
      maxZoom: 18
    }).addTo(this.map);
  }

  private updateLocation(location) {
    this.map.panTo(location);
    if (!this.marker) {
      this.marker = Leaflet
        .marker(location)
        .addTo(this.map);
    } else {
      this.marker.setLatLng(location);
    }
  }

  startActivity() {
    this.navCtrl.push(Activity);
  }
}
