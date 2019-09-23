/* eslint-disable prettier/prettier */
import {
    TRIP_DETAILS,
    GET_ACTIVE_TRIP,
    GET_RIDE_HISTORY_ALL,

  } from "../types";
  
  export default function(state = {}, action) {
  
    switch (action.type) {
      
      case TRIP_DETAILS:
        return {
          ...state,
          activeTripDetails: action.payload
        };

        case GET_ACTIVE_TRIP:
        return {
          ...state,
          getActiveTrip: action.payload
        };
        
        case GET_RIDE_HISTORY_ALL:
        return {
          ...state,
          getRideHistoryAll: action.payload
        };

      default:
        return state;
    }
  }
  