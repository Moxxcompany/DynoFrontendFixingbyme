import { call, put } from "redux-saga/effects";

import axios from "@/axiosConfig";
import { TOAST_SHOW } from "../Actions/ToastAction";
import { WALLET_API_ERROR, WALLET_FETCH } from "../Actions/WalletAction";

interface IWalletAction {
  crudType: string;
  payload: any;
}

export function* WalletSaga(action: IWalletAction): unknown {
  switch (action.crudType) {
    case WALLET_FETCH:
      yield getWallet();
      break;

    default:
      yield put({ type: WALLET_API_ERROR });
      break;
  }
}

export function* getWallet(): unknown {
  try {
    const {
      data: { data, message },
    } = yield call(axios.get, "wallet/getWallet");

    yield put({
      type: WALLET_FETCH,
      payload: data,
    });
  } catch (e: any) {
    const message = e.response.data.message ?? e.message;
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: WALLET_API_ERROR,
    });
  }
}
