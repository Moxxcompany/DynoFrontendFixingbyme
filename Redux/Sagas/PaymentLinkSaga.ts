import { call, put } from "redux-saga/effects";
import axiosBaseApi from "@/axiosConfig";
import {
  PAYLINK_FETCH,
  PAYLINK_CREATE,
  PAYLINK_UPDATE,
  PAYLINK_DELETE,
  PAYLINK_ERROR,
  PAYLINK_FEE_PREVIEW,
} from "../Actions/PaymentLinkAction";
import { TOAST_SHOW } from "../Actions/ToastAction";

interface PaymentLinkSagaAction {
  type: string;
  payload?: any;
  crudType?: string;
}

export function* PaymentLinkSaga(action: PaymentLinkSagaAction): Generator<any, void, any> {
  const { crudType, payload } = action;

  try {
    switch (crudType) {
      case PAYLINK_FETCH: {
        const response = yield call(axiosBaseApi.get, "/pay/getPaymentLinks");
        if (response?.data?.status) {
          yield put({
            type: PAYLINK_FETCH,
            payload: {
              paymentLinks: response.data.data?.paymentLinks || response.data.data || [],
            },
          });
        } else {
          yield put({ type: PAYLINK_ERROR });
        }
        break;
      }

      case PAYLINK_CREATE: {
        const response = yield call(axiosBaseApi.post, "/pay/createPaymentLink", payload);
        if (response?.data?.status) {
          yield put({
            type: PAYLINK_CREATE,
            payload: {
              paymentLink: response.data.data,
            },
          });
          yield put({
            type: TOAST_SHOW,
            payload: {
              message: "Payment link created successfully",
              severity: "success",
            },
          });
        } else {
          yield put({ type: PAYLINK_ERROR });
          yield put({
            type: TOAST_SHOW,
            payload: {
              message: response?.data?.message || "Failed to create payment link",
              severity: "error",
            },
          });
        }
        break;
      }

      case PAYLINK_UPDATE: {
        const { id, ...updateData } = payload;
        const response = yield call(axiosBaseApi.put, `/pay/links/${id}`, updateData);
        if (response?.data?.status) {
          yield put({
            type: PAYLINK_UPDATE,
            payload: {
              paymentLink: response.data.data,
            },
          });
          yield put({
            type: TOAST_SHOW,
            payload: {
              message: "Payment link updated successfully",
              severity: "success",
            },
          });
        } else {
          yield put({ type: PAYLINK_ERROR });
          yield put({
            type: TOAST_SHOW,
            payload: {
              message: response?.data?.message || "Failed to update payment link",
              severity: "error",
            },
          });
        }
        break;
      }

      case PAYLINK_DELETE: {
        const { id } = payload;
        const response = yield call(axiosBaseApi.delete, `/pay/deletePaymentLink/${id}`);
        if (response?.data?.status) {
          yield put({
            type: PAYLINK_DELETE,
            payload: { id },
          });
          yield put({
            type: TOAST_SHOW,
            payload: {
              message: "Payment link deleted successfully",
              severity: "success",
            },
          });
        } else {
          yield put({ type: PAYLINK_ERROR });
          yield put({
            type: TOAST_SHOW,
            payload: {
              message: response?.data?.message || "Failed to delete payment link",
              severity: "error",
            },
          });
        }
        break;
      }

      case PAYLINK_FEE_PREVIEW: {
        const response = yield call(axiosBaseApi.post, "/pay/feePreview", payload);
        if (response?.data?.status) {
          yield put({
            type: PAYLINK_FEE_PREVIEW,
            payload: {
              feePreview: response.data.data,
            },
          });
        } else {
          yield put({ type: PAYLINK_ERROR });
          yield put({
            type: TOAST_SHOW,
            payload: {
              message: response?.data?.message || "Failed to fetch fee preview",
              severity: "error",
            },
          });
        }
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error("PaymentLinkSaga error:", error);
    yield put({ type: PAYLINK_ERROR });
  }
}
