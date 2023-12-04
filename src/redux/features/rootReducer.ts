import { combineReducers } from "@reduxjs/toolkit";
import headlineReducer from "./headLineSlice";
import userPrefSliceReducer from './userPrefSlice'

const rootReducer = combineReducers({
  headline: headlineReducer,
  userPref: userPrefSliceReducer,

});

export default rootReducer;
