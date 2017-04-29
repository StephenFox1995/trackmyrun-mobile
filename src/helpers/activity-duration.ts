import * as moment from 'moment';

/**
 * Calculates the duration of an activiy.
 * @param start The starting time of the activity.
 * @param end The end time of the activity.
 */
export let activityDuration = (start, end) => {
    let mStart = moment(start);
    let mEnd = moment(end);
    return moment(mEnd.diff(mStart)).format("HH:mm:ss");   
}