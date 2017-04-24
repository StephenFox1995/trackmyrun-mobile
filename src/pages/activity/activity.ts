import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams,  
  LoadingController, 
  Loading, 
  AlertController 
} from 'ionic-angular';
import * as moment from 'moment';
import { mapLayer } from '../../helpers/url';

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as Leaflet from "leaflet";
import 'geojson';

import { LocationService } from '../../providers/location-service';
import { GeojsonService } from '../../providers/geojson-service';
import { StorageService } from '../../providers/storage-service';
import { ActivityModel } from '../../models/activity-model';
import { TrackerService } from '../../providers/tracker-service';
/**
 * Generated class for the Activity page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class Activity {
  activityTime: any;
  activityName: any;
  private startTime: Date;
  private endTime: Date;
  private map: Leaflet.Map;
  private marker: Leaflet.Marker;
  private activity: ActivityModel;
  private ACTIVITY_KEY = 'ACTIVITY';
  private locationSubScription: Subscription;
  private timerSubscritpion: Subscription;
  private loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private locationService: LocationService,
    private geojsonService: GeojsonService,
    private storageService: StorageService,
    private trackerService: TrackerService,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {  
      this.activity = this.navParams.get('activity');
      this.activityName = this.activity.getName();
      // save this activity first, as coordinates will be added to it later.
      this.saveActvity();
    }


  ionViewDidLoad() {
    this.initMap();
    this.startTimer();
    this.startLocating();
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

  private startTimer() {
    this.startTime = new Date();
    this.timerSubscritpion = Observable
      .interval(100)
      .timeInterval()
      .subscribe(total => {
        this.activityTime = this.humanReadableTime(total.value);
      });
  }
  
  private startLocating() {
    this.locationSubScription = this.locationService.watchLocation()
      .subscribe(coords => {
        this.updateLocation(coords);
      }, err => console.log('error occurred while tracking location'));
  }

  private updateLocation(location) {
    this.activity.addCoordinates(location.lng, location.lat);
    this.map.panTo(location);
    if (!this.marker) {
      this.marker = Leaflet.marker(location).addTo(this.map);
    } else {
      this.marker.setLatLng(location);
    }
    Leaflet.geoJSON(this.activity.getGeoJSON()).addTo(this.map);
    this.saveActvity();
  }

  private saveActvity() {
    this.storageService.store(this.ACTIVITY_KEY, this.activity).subscribe();
  }

  private humanReadableTime(time) {
    return moment(time).format('mm:ss:SSS');
  }
  
  private stopTimer() {
    this.endTime = new Date();
  }

  private unsubcribeAll() {
    this.locationSubScription.unsubscribe();
    this.timerSubscritpion.unsubscribe();
  }

  finishActivity() {
    this.stopTimer();
    this.unsubcribeAll();
    
    this.storageService.get(this.ACTIVITY_KEY)
      .subscribe(activity => {
        this.activity.setStart(this.startTime);
        this.activity.setEnd(this.endTime.toISOString());
        const geojsonActivity = this.activity.asGeoJSON();
        this.showLoading();
        this.trackerService.uploadActivity(geojsonActivity)
          .then(sucess => {
            this.loading.dismiss()
            this.navCtrl.popAll()
          })
          .catch(err => this.showAlert('Fail', 'Could not upload activity.'))
      }, err => {
        console.log('an error occurred when finishing');
      });
  }
  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Upload activity...'
    });
    this.loading.present();
  }

  showAlert(title, text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
