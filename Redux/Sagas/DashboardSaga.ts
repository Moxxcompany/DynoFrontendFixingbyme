import { call, put } from "redux-saga/effects";
import axiosBaseApi from "@/axiosConfig";
import {
  DASHBOARD_FETCH,
  DASHBOARD_CHART_FETCH,
  DASHBOARD_FEE_TIERS_FETCH,
  DASHBOARD_RECENT_TX_FETCH,
  DASHBOARD_ERROR,
} from "../Actions/DashboardAction";

interface DashboardSagaAction {
  type: string;
  payload?: any;
  crudType?: string;
}

export function* DashboardSaga(action: DashboardSagaAction): Generator<any, void, any> {
  const { crudType, payload } = action;

  try {
    switch (crudType) {
      case DASHBOARD_FETCH: {
        const response = yield call(axiosBaseApi.get, "/dashboard");
        if (response?.data?.status) {
          yield put({
            type: DASHBOARD_FETCH,
            payload: {
              stats: {
                totalTransactions: response.data.data?.totalTransactions ?? 0,
                totalVolume: response.data.data?.totalVolume ?? 0,
                activeWallets: response.data.data?.activeWallets ?? 0,
                transactionChange: response.data.data?.transactionChange ?? 0,
                volumeChange: response.data.data?.volumeChange ?? 0,
              },
            },
          });
        } else {
          yield put({ type: DASHBOARD_ERROR });
        }
        break;
      }

      case DASHBOARD_CHART_FETCH: {
        const period = payload?.period || "7d";
        const params: any = { period };
        if (payload?.startDate) params.startDate = payload.startDate;
        if (payload?.endDate) params.endDate = payload.endDate;

        const response = yield call(axiosBaseApi.get, "/dashboard/chart", { params });
        if (response?.data?.status) {
          yield put({
            type: DASHBOARD_CHART_FETCH,
            payload: {
              chartData: response.data.data?.chartData || [],
            },
          });
        } else {
          yield put({ type: DASHBOARD_ERROR });
        }
        break;
      }

      case DASHBOARD_FEE_TIERS_FETCH: {
        const response = yield call(axiosBaseApi.get, "/dashboard/fee-tiers");
        if (response?.data?.status) {
          yield put({
            type: DASHBOARD_FEE_TIERS_FETCH,
            payload: {
              feeTiers: {
                monthlyLimit: response.data.data?.monthlyLimit ?? 50000,
                usedAmount: response.data.data?.usedAmount ?? 0,
                currentTier: response.data.data?.currentTier ?? "Standard",
              },
            },
          });
        } else {
          yield put({ type: DASHBOARD_ERROR });
        }
        break;
      }

      case DASHBOARD_RECENT_TX_FETCH: {
        const response = yield call(axiosBaseApi.get, "/dashboard/recent-transactions");
        if (response?.data?.status) {
          yield put({
            type: DASHBOARD_RECENT_TX_FETCH,
            payload: {
              recentTransactions: response.data.data?.transactions || [],
            },
          });
        } else {
          yield put({ type: DASHBOARD_ERROR });
        }
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error("DashboardSaga error:", error);
    yield put({ type: DASHBOARD_ERROR });
  }
}
