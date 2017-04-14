import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Leaflet from "leaflet";
import * as GeoJSON from 'geojson';

import { mapLayer } from '../../helpers/url';
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
  private map: Leaflet.Map;
  private center: Leaflet.PointTuple;
  activity: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public locationService: LocationService) { 
    this.activity = navParams.get('activity');
  }

  ionViewDidLoad() {
    this.center = [48.77758, -92.73761];
    this.initMap();
    
    this.locationService.getCurrentLocation()
      .subscribe((lat, lng) => {
        this.center = [lat, lng];
    }, (error) => {
      console.log('An error occurred tracking location');
    })
  }

  private drawActivityRoute(locations) {

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

    
    Leaflet.geoJSON(this.activity).addTo(this.map);
  }

}
