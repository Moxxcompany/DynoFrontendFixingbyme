import { ReducerAction } from "@/utils/types";
import { walletReducer as IWalletReducer } from "@/utils/types";
import {
  WALLET_API_ERROR,
  WALLET_DELETE,
  WALLET_FETCH,
  WALLET_FUND_CREATE,
  WALLET_INIT,
  WALLET_INSERT,
  WALLET_UPDATE,
} from "../Actions/WalletAction";

const walletInitialState: IWalletReducer = {
  walletList: [],
  loading: false,
  amount: 0,
  currency: "USD",
  paymentData: {
    mode: "",
    fields: [],
    uniqueRef: "",
  },
};

const walletReducer = (state = walletInitialState, action: ReducerAction) => {
  const { payload } = action;

  switch (action.type) {
    case WALLET_INIT:
      return {
        ...state,
        loading: true,
      };
    case WALLET_INSERT:
      return {
        ...state,
        loading: false,
        walletList: [...state.walletList, payload],
      };

    case WALLET_UPDATE:
      const index = state.walletList.findIndex((x) => x.id === payload.id);
      const tempArray = [...state.walletList];
      tempArray[index] = payload.data;
      return {
        ...state,
        loading: false,
        walletList: tempArray,
      };

    case WALLET_FETCH:
      return {
        ...state,
        loading: false,
        walletList: payload,
      };

    case WALLET_DELETE:
      const tempList = state.walletList.filter((x) => x.id !== payload);
      return {
        ...state,
        loading: false,
        walletList: [...tempList],
      };

    case WALLET_FUND_CREATE:
      return {
        ...state,
        loading: false,
        amount: payload.amount,
        currency: payload.currency,
      };

    case WALLET_API_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default walletReducer;
