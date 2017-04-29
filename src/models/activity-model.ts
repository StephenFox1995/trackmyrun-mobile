import { lineDistance, lineString } from '@turf/turf';
import { Feature, LineString } from '@types/geojson';
import { activityDuration } from '../helpers/activity-duration';

export class ActivityModel {
  private feature: Feature<LineString>;

  constructor(feature=undefined) { 
    if (feature) {
      this.feature = lineString(feature.geometry.coordinates, feature.properties)
      this.setTransientFields();
    } else {
      this.feature = lineString([]);
      this.setProperty('kilometers', 0)
    }
  }

  static fromFeatureCollection(collection) : Array<ActivityModel> {
    let features = collection.features;
    return features.map((feature) => new ActivityModel(feature));
  }

  /**
   * Set a property on the feature object.
   * @param name The name of the property
   * @param data The value of the property.
   */
  private setProperty(name, data) {
    this.feature.properties[name] = data;
  }

  /**
   * Returns a property on the 
   * @param name The name of the property.
   */
  private getProperty(name) {
    return this.feature.properties[name];
  }
  
  /**
   * Sets any transient fields such as duration of the activity.
   */
  private setTransientFields() {
    // Set the duration field.
    this.setProperty(
      'duration',
      activityDuration(this.getProperty('start'), this.getProperty('end'))
    );
  }
  
  /**
   * Adds coordinates to the linestring of the activity.
   * @param lng The longtitude
   * @param lat The latitude
   */
  addCoordinates(lng, lat) {
    this.feature.geometry.coordinates.push([lng, lat]);
    this.setProperty('distance', lineDistance(this.feature, 'kilometers'));
  }
  getGeoJSON() {
    return this.feature;
  }
  setUserID(userID) {
    this.setProperty('userID', userID);
  }
  getUserID() {
    this.getProperty('userID');
  }
  setName(name) {
    this.setProperty('name', name);
  }
  getName() {
    this.getProperty('name');
  }
  setType(type) {
    if (type === 'Run' || type === 'Walk') {
      this.setProperty('activity_type', type);
    } else {
      throw(new Error(`${type} is an invalid activity_type value.`))
    }
  }
  getType() {
    return this.getProperty('activity_type');
  }
  setStart(start) {
    this.setProperty('start', start);
  }
  getStart() {
    return this.getProperty('start');
  }
  setEnd(end) {
    this.setProperty('end', end);
  }
  getEnd() {
    return this.getProperty('end');
  }
  setOwner(owner) {
    this.setProperty('owner', owner);
  }
  getOwner() {
    return this.getProperty('owner');
  }
  getDistance() {
    return this.getProperty('distance');
  }
  getDuration() {
    return this.getProperty('duration');
  }
  getCoordinates() {
    return this.feature.geometry.coordinates;
  }
  asGeoJSON() {
    return this.feature;
  }
}