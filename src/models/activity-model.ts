import { lineDistance, lineString } from '@turf/turf';
import { Feature, LineString } from "@types/geojson";

export class ActivityModel {
  private name: string;
  private type: string;
  private userID: number;
  private start: Date;
  private end: Date;
  length: number;
  private route: Feature<LineString>;

  constructor() { 
    this.route = lineString([]);
  }

  private addToGeoJSONProperties(name, data) {
    console.log(this.route);
    this.route.properties[name] = data;
  }

  addCoordinates(lng, lat) {
    this.route.geometry.coordinates.push([lng, lat]);
    this.length = lineDistance(this.route, 'kilometers');
  }
  getGeoJSON() {
    return this.route;
  }
  setUser(userID) {
    this.userID = userID;
  }
  getUser() {
    return this.userID;
  }
  setName(name) {
    this.name = name;
    this.addToGeoJSONProperties('name', name);
  }
  getName() {
    return this.name;
  }
  setType(type) {
    if (type === 'RUN' || type === 'WALK') {
      this.type = type;
      this.addToGeoJSONProperties('activity_type', type);
    } else {
      throw(new Error(`${type} is an invalid ActivityModel type`))
    }
    this.type = type;
    this.addToGeoJSONProperties('activity_type', type);
  }
  getType() {
    return this.type;
  }
  setStart(start) {
    this.start = start;
    this.addToGeoJSONProperties('start', start);
  }
  getStart() {
    return this.start;
  }
  setEnd(end) {
    this.end = end;
    this.addToGeoJSONProperties('end', end);
  }
  getEnd() {
    return this.end;
  }
  asGeoJSON() {
    return this.route;
  }
}