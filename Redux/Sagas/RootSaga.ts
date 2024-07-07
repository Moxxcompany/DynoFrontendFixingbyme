import { takeEvery } from "redux-saga/effects";
import { USER_INIT } from "../Actions/UserAction";
import { UserSaga } from "./UserSaga";
import { TOAST_INIT } from "../Actions/ToastAction";
import { ToastSaga } from "./ToastSaga";
import { COMPANY_INIT } from "../Actions/CompanyAction";
import { CompanySaga } from "./CompanySaga";

function* RootSaga() {
  yield takeEvery(USER_INIT, UserSaga);
  yield takeEvery(TOAST_INIT, ToastSaga);
  yield takeEvery(COMPANY_INIT, CompanySaga);
}

export default RootSaga;
