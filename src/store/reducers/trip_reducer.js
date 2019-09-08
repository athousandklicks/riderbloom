/* eslint-disable prettier/prettier */
import {
    TRIP_DETAILS,

  } from "../types";
  
  export default function(state = {}, action) {
  
    switch (action.type) {
      
      case TRIP_DETAILS:
        return {
          ...state,
          activeTripDetails: action.payload
        };
        
      default:
        return state;
    }
  }
  