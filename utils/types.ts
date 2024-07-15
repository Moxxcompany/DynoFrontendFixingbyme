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

// success types

export interface successRes {
  id: number;
  txRef: string;
  orderRef: string;
  flwRef: string;
  redirectUrl: string;
  device_fingerprint: string;
  settlement_token: any;
  cycle: string;
  amount: number;
  charged_amount: number;
  appfee: number;
  merchantfee: number;
  merchantbearsfee: number;
  chargeResponseCode: string;
  raveRef: string;
  chargeResponseMessage: string;
  authModelUsed: string;
  currency: string;
  IP: string;
  narration: string;
  status: string;
  modalauditid: string;
  vbvrespmessage: string;
  authurl: string;
  vbvrespcode: string;
  acctvalrespmsg: any;
  acctvalrespcode: string;
  paymentType: string;
  paymentPlan: any;
  paymentPage: any;
  paymentId: string;
  fraud_status: string;
  charge_type: string;
  is_live: number;
  retry_attempt: any;
  getpaidBatchId: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  customerId: number;
  AccountId: number;
  customer: ICustomer;
  chargeToken: IChargeToken;
  airtime_flag: boolean;
}

export interface ICustomer {
  id: number;
  phone: any;
  fullName: string;
  customertoken: any;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  AccountId: number;
}

export interface IChargeToken {
  user_token: string;
  embed_token: string;
}
