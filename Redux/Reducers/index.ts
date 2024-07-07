import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import toastReducer from "./toastReducer";
import companyReducer from "./companyReducer";

export default combineReducers({
  userReducer,
  toastReducer,
  companyReducer,
});
