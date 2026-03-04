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
        const apiData = response?.data?.data;
        if (apiData) {
          yield put({
            type: DASHBOARD_FETCH,
            payload: {
              stats: {
                totalTransactions: apiData.total_transactions?.count ?? 0,
                totalVolume: apiData.total_volume?.amount ?? 0,
                activeWallets: apiData.active_wallets?.count ?? 0,
                transactionChange: apiData.total_transactions?.change_percent ?? 0,
                volumeChange: apiData.total_volume?.change_percent ?? 0,
                pendingTransactions: apiData.pending_transactions?.count ?? 0,
                totalVolumeFormatted: apiData.total_volume?.amount_formatted ?? "$0.00 USD",
                activeWalletsList: apiData.active_wallets?.wallets ?? [],
                feeTier: apiData.fee_tier ?? null,
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
        const apiData = response?.data?.data;
        if (apiData) {
          yield put({
            type: DASHBOARD_CHART_FETCH,
            payload: {
              chartData: (apiData.chart_data || []).map((item: any) => ({
                date: item.date,
                value: item.volume ?? 0,
                transactionCount: item.transaction_count ?? 0,
              })),
            },
          });
        } else {
          yield put({ type: DASHBOARD_ERROR });
        }
        break;
      }

      case DASHBOARD_FEE_TIERS_FETCH: {
        const response = yield call(axiosBaseApi.get, "/dashboard/fee-tiers");
        const apiData = response?.data?.data;
        if (apiData) {
          const userTier = apiData.user_tier || {};
          yield put({
            type: DASHBOARD_FEE_TIERS_FETCH,
            payload: {
              feeTiers: {
                monthlyLimit: userTier.amount_to_next_tier
                  ? userTier.monthly_volume + userTier.amount_to_next_tier
                  : 50000,
                usedAmount: userTier.monthly_volume ?? 0,
                currentTier: userTier.current_tier ?? "Standard",
                tiers: apiData.tiers || [],
                percentToNextTier: userTier.percent_to_next_tier ?? 0,
                amountToNextTier: userTier.amount_to_next_tier ?? 0,
                nextTier: userTier.next_tier ?? "",
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
        const apiData = response?.data?.data;
        if (apiData) {
          yield put({
            type: DASHBOARD_RECENT_TX_FETCH,
            payload: {
              recentTransactions: apiData.transactions || [],
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
