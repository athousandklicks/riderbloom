/* eslint-disable prettier/prettier */
import {
  TRIP_DETAILS,
  GET_ACTIVE_TRIP,
} from '../types';

import axios from 'axios';


const URL = 'http://104.248.254.71/app/public/api';

  export function activeTripDetails(id){
    const request = axios.get(`${URL}/get-trip-details/${id}`)
                    .then(response => response.data );
                    console.log('THIS IS postActiveTrip: '+request);
    return {
        type: TRIP_DETAILS,
        payload: request
    }
}


export function getActiveTrip(id){
  const request = axios.get(`${URL}/get-active-trip/${id}`)
                  .then(response => response.data );
                  console.log('THIS IS getActiveTrip: '+request);
  return {
      type: GET_ACTIVE_TRIP,
      payload: request
  }
}
