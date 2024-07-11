import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import toastReducer from "./toastReducer";
import companyReducer from "./companyReducer";
import walletReducer from "./walletReducer";
export default combineReducers({
  userReducer,
  toastReducer,
  companyReducer,
  walletReducer,
});
