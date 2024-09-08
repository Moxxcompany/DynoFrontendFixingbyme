import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import toastReducer from "./toastReducer";
import companyReducer from "./companyReducer";
import walletReducer from "./walletReducer";
import apiReducer from "./apiReducer";

export default combineReducers({
  userReducer,
  toastReducer,
  companyReducer,
  apiReducer,
  walletReducer,
});
