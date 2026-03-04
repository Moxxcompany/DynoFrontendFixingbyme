import { call, put } from "redux-saga/effects";

import axios from "@/axiosConfig";
import { TOAST_SHOW } from "../Actions/ToastAction";
import {
  TRANSACTION_ERROR,
  TRANSACTION_FETCH,
  TRANSACTION_DETAIL_FETCH,
  TRANSACTION_EXPORT,
} from "../Actions/TransactionAction";

interface ITransactionAction {
  crudType: string;
  payload: any;
}

export function* TransactionSaga(action: ITransactionAction): unknown {
  switch (action.crudType) {
    case TRANSACTION_FETCH:
      yield getAllTransactions();
      break;

    case TRANSACTION_DETAIL_FETCH:
      yield getTransactionDetail(action.payload);
      break;

    case TRANSACTION_EXPORT:
      yield exportTransactions(action.payload);
      break;

    default:
      yield put({ type: TRANSACTION_ERROR });
      break;
  }
}

export function* getAllTransactions(): unknown {
  try {
    const {
      data: { data, message },
    } = yield call(axios.post, "wallet/getAllTransactions");

    yield put({
      type: TRANSACTION_FETCH,
      payload: data,
    });
  } catch (e: any) {
    const message = e?.response?.data?.message ?? e?.message ?? "Failed to fetch transactions";
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: TRANSACTION_ERROR,
    });
  }
}

export function* getTransactionDetail(payload: any): unknown {
  try {
    const { id } = payload;
    const response = yield call(axios.get, `transaction/${id}`);
    const responseData = response?.data;

    if (responseData?.status || responseData?.success !== false) {
      yield put({
        type: TRANSACTION_DETAIL_FETCH,
        payload: responseData?.data || responseData,
      });
    } else {
      throw new Error(responseData?.message || "Failed to fetch transaction detail");
    }
  } catch (e: any) {
    const message = e?.response?.data?.message ?? e?.message ?? "Failed to fetch transaction detail";
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: TRANSACTION_ERROR,
    });
  }
}

export function* exportTransactions(payload: any): unknown {
  try {
    const response = yield call(axios.post, "transactions/export", payload || {}, {
      responseType: "blob",
    });

    // Create download link from blob
    const blob = new Blob([response.data], {
      type: response.headers?.["content-type"] || "text/csv",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `transactions_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    yield put({ type: TRANSACTION_EXPORT });
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: "Transactions exported successfully",
      },
    });
  } catch (e: any) {
    const message = e?.response?.data?.message ?? e?.message ?? "Failed to export transactions";
    yield put({
      type: TOAST_SHOW,
      payload: {
        message: message,
        severity: "error",
      },
    });
    yield put({
      type: TRANSACTION_ERROR,
    });
  }
}
