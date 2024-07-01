import { ReducerAction } from "@/utils/types";
import {
  USER_API_ERROR,
  USER_INIT,
  USER_LOGIN,
  USER_REGISTER,
} from "../Actions/UserAction";

const userInitialState = {
  email: "",
  name: "",
  loading: false,
};

const userReducer = (state = userInitialState, action: ReducerAction) => {
  const { payload } = action;

  switch (action.type) {
    case USER_INIT:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN:
      return {
        ...state,
        email: payload.email,
        name: payload.name,
        loading: true,
      };
    case USER_REGISTER:
      localStorage.setItem("token", payload.accessToken);
      return {
        ...state,
        email: payload.email,
        name: payload.name,
        loading: true,
      };
    case USER_API_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
