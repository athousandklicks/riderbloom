/* eslint-disable prettier/prettier */
import {
  TRIP_DETAILS
} from '../types';

import axios from 'axios';


const URL = 'http://104.248.254.71/app/public/api';

  export function activeTripDetails(id){
    const request = axios.get(`${URL}/get-trip-details/${id}`)
                    .then(response => response.data );
                    console.log(request);

    return {
        type: TRIP_DETAILS,
        payload: request
    }
}
