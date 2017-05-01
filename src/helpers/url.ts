import { ip } from './ip';
import { Headers } from '@angular/http';


export let baseurl = `${ip}:8000`;
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
export let activityForOwnerEndpoint = (id) => { 
    return `${baseurl}${api}/activity/owner/${id}` 
};

export let mapLayer = `http://{s}.tile.osm.org/{z}/{x}/{y}.png`;
