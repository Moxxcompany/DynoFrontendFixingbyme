import { call, put } from "redux-saga/effects";

import axios from "@/axiosConfig";
import { TOAST_SHOW } from "../Actions/ToastAction";
import {
  WALLET_API_ERROR,
  WALLET_DELETE,
  WALLET_FETCH,
  WALLET_INSERT,
  WALLET_UPDATE,
} from "../Actions/WalletAction";

interface IWalletAction {
  crudType: string;
  payload: any;
}

export function* WalletSaga(action: IWalletAction): unknown {
  switch (action.crudType) {
    case WALLET_INSERT:
      yield addWallet(action.payload);
      break;

    case WALLET_FETCH:
      yield getWallet();
      break;

    case WALLET_DELETE:
      yield deleteWallet(action.payload);
      break;

    case WALLET_UPDATE:
      yield updateWallet(action.payload);
      break;

    default:
      yield put({ type: WALLET_API_ERROR });
      break;
  }
}

export function* addWallet(payload: any): unknown {
  try {
    const {
      data: { data, message },
    } = yield call(axios.post, "wallet/addWallet", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    yield put({
      type: TOAST_SHOW,
      payload: { message },
    });
    yield put({
      type: WALLET_INSERT,
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

export function* updateWallet(payload: any): unknown {
  try {
    const { id, formData } = payload;
    const {
      data: { data, message },
    } = yield call(axios.post, "wallet/updateWallet/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    yield put({
      type: TOAST_SHOW,
      payload: { message },
    });
    yield put({
      type: WALLET_UPDATE,
      payload: { id, data },
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

export function* deleteWallet(payload: any): unknown {
  try {
    const { id } = payload;
    const {
      data: { data, message },
    } = yield call(axios.delete, "wallet/deleteWallet/" + id);

    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: WALLET_DELETE,
      payload: id,
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
