import { AlertColor } from "@mui/material";

export interface ReducerAction {
  payload: any;
  type: string;
}

export interface rootReducer {
  userReducer: userReducer;
  toastReducer: toastReducer;
}

export interface userReducer {
  email: string;
  name: string;
  loading: boolean;
}

export interface toastReducer {
  open: boolean;
  severity: AlertColor;
  message: string;
  hide?: boolean;
  loading?: boolean;
}

export interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  pageName: string;
  component?: any;
}

export interface TokenData {
  email: string;
  name: string;
}

export interface IconProps {
  fill?: string;
  size?: number;
}
