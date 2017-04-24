import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GeojsonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeojsonService {

  constructor(public http: Http) {
  }

  lineStringGeoJSON(coordinates, properties) {
    return { 
      type: 'Feature',
      geometry: {
        type: 'MultiLineString',
        coordinates: [coordinates]
      },
      properties: properties
    }
  }

  lineStringGeoJSONTemplate() {
    return { 
      type: 'Feature',
      geometry: {
        type: 'MultiLineString',
        coordinates: []
      },
      properties: {}
    }
  }
}
