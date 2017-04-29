import { ip, localhost } from './ip';
import { Headers } from '@angular/http';


export let baseurl = `${localhost}:8000`;
export let api = '/api'

/**
 * Authenticate via rest api for a token.
 */
export let tokenAuthEndpoint = function(username, password) {
    return `${baseurl}${api}/token-auth/?username=${username}&password=${password}`;
}

export let registerEndpoint = `${baseurl}${api}/register`;

export let defaultHeaders = () => {
    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
}

export let activityEnpoint = `${baseurl}${api}/activity`;
export let activityForUserEndpoint = `${baseurl}${api}/activity/user`;

export let mapLayer = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
