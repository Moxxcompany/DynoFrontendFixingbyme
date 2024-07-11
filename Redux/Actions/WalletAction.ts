export const WALLET_INIT: any = "WALLET_INIT";
export const WALLET_INSERT = "WALLET_INSERT";
export const WALLET_FETCH = "WALLET_FETCH";
export const WALLET_UPDATE = "WALLET_UPDATE";
export const WALLET_DELETE = "WALLET_DELETE";
export const WALLET_API_ERROR = "WALLET_API_ERROR";

export const WalletAction = (type?: string, data?: any) => {
  return { type: WALLET_INIT, payload: data, crudType: type };
};
