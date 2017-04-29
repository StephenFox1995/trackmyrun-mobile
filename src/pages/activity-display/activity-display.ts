import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Leaflet from "leaflet";
import { User } from '../user/user';
import { mapLayer } from '../../helpers/url';
import { LocationService } from '../../providers/location-service';
import { ActivityModel } from '../../models/activity-model';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public locationService: LocationService) { 
    this.activity = <ActivityModel>navParams.get('activity');
  }

  ionViewDidLoad() {
    this.initMap();
    
    this.locationService.getCurrentLocation()
      .subscribe((lat, lng) => {
        this.center = [lat, lng];
    }, (error) => {
      console.log('An error occurred tracking location');
    })
  }


  private initMap() {
    this.map = Leaflet.map('map', {
      center: [this.activity.getCoordinates()[0][1], this.activity.getCoordinates()[0][0]],
      zoom: 15
    });
    Leaflet.tileLayer(mapLayer, {
      attribution: '',
      maxZoom: 18
    }).addTo(this.map);
    Leaflet.geoJSON(this.activity.asGeoJSON()).addTo(this.map);
  }

  showUser(user) {
    this.navCtrl.push(User, { username: this.activity.getOwner().username });
  }
}
