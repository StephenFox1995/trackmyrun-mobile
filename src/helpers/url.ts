import { Headers } from '@angular/http';
import { mapboxToken } from './tokens';

export let baseurl = 'http://127.0.0.1:8000';
export let api = '/api'

/**
 * Authenticate via rest api for a token.
 */
export let tokenAuthEndpoint = function(username, password) {
    return `${baseurl}${api}/token-auth/?username=${username}&password=${password}`
}

export let registerEndpoint = `${baseurl}${api}/register`;

export let defaultHeaders = () => {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
}

export let activityEnpoint = `${baseurl}${api}/activity`;

export let mapbox = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`;

