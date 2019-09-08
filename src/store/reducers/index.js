/* eslint-disable prettier/prettier */
import { combineReducers } from "redux";
import active_trips from "./trip_reducer";


const rootReducer = combineReducers({
  active_trips,
 });

export default rootReducer;
