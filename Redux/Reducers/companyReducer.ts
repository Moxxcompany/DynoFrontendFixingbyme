import { ReducerAction } from "@/utils/types";
import { companyReducer as ICompanyReducer } from "@/utils/types";
import {
  COMPANY_API_ERROR,
  COMPANY_DELETE,
  COMPANY_FETCH,
  COMPANY_INIT,
  COMPANY_INSERT,
  COMPANY_UPDATE,
} from "../Actions/CompanyAction";

const companyInitialState: ICompanyReducer = {
  companyList: [],
  loading: false,
};

const companyReducer = (state = companyInitialState, action: ReducerAction) => {
  const { payload } = action;

  switch (action.type) {
    case COMPANY_INIT:
      return {
        ...state,
        loading: true,
      };
    case COMPANY_INSERT:
      return {
        ...state,
        loading: false,
        companyList: [...state.companyList, payload],
      };

    case COMPANY_UPDATE:
      const index = state.companyList.findIndex(
        (x) => x.company_id === payload.id
      );
      const tempArray = [...state.companyList];
      tempArray[index] = payload.data;
      return {
        ...state,
        loading: false,
        companyList: tempArray,
      };

    case COMPANY_FETCH:
      return {
        ...state,
        loading: false,
        companyList: payload,
      };

    case COMPANY_DELETE:
      const tempList = state.companyList.filter(
        (x) => x.company_id !== payload
      );
      return {
        ...state,
        loading: false,
        companyList: [...tempList],
      };

    case COMPANY_API_ERROR:
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

export default companyReducer;
