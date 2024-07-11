import { AlertColor } from "@mui/material";

export interface ReducerAction {
  payload: any;
  type: string;
  crudType: string;
}

export interface rootReducer {
  userReducer: userReducer;
  toastReducer: toastReducer;
  companyReducer: companyReducer;
  walletReducer: walletReducer;
}

export interface userReducer {
  email: string;
  name: string;
  loading: boolean;
  mobile: string;
  user_id: number;
  photo: string;
  telegram_id: string;
}

export interface companyReducer {
  companyList: ICompany[];
  loading: boolean;
}
export interface walletReducer {
  walletList: IWallet[];
  totalBalance: number;
  loading: boolean;
}

export interface ICompany {
  company_id: number;
  user_id: number;
  company_name: string;
  mobile: string;
  photo: string;
  email: string;
  website: string;
}

export interface IWallet {
  company_id: number;
  user_id: number;
  wallet_id: number;
  company_name: string;
  amount: number;
  photo: string;
  email: string;
}

export interface menuItem {
  value: any;
  label: any;
  disable?: boolean;
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
  user_id: number;
  name: string;
  email: string;
  photo: string;
  mobile: string;
  telegram_id: string;
}

export interface IconProps {
  fill?: string;
  size?: number;
}

export interface pageProps {
  setPageName: Function;
  setComponent: Function;
}

export interface IToastProps {
  open?: boolean;
  severity?: AlertColor;
  message?: string;
  hide?: boolean;
  loading?: boolean;
}
