/* eslint-disable prettier/prettier */
import { combineReducers } from "redux";
import active_trips from "./trip_reducer";
import ride_history from "./trip_reducer";


const rootReducer = combineReducers({
  active_trips,
  ride_history,
 });

export default rootReducer;
