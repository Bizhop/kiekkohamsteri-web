import { all, fork } from "redux-saga/effects"

import kiekkoSaga from "./components/discs/kiekkoSaga"
import userSaga from "./components/user/userSaga"

function* rootSaga() {
  yield all([fork(kiekkoSaga), fork(userSaga)])
}

export default rootSaga
