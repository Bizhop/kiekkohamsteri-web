import { all, call, takeEvery } from "redux-saga/effects"
import { googleLogout } from "@react-oauth/google"

import { LOGOUT } from "./userActions"

function* logoutSaga() {
  yield call(googleLogout)
}

function* userSaga() {
  yield all([takeEvery(LOGOUT, logoutSaga)])
}

export default userSaga
