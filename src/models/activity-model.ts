export class ActivityModel {
  private name: string;
  private type: string;
  private userID: number;
  private start: Date;
  private end: Date;
  private route = { 
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates: [[]]
        },
        properties: {}
      }
    ]
  }

  constructor() { }

  private addToGeoJSONProperties(name, data) {
    this.route.features[0].properties[name] = data;
  }

  addCoordinates(lng, lat) {
    this.route.features[0].geometry.coordinates[0].push([lng, lat]);
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
}