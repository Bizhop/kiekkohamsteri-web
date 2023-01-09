import { all, fork } from "redux-saga/effects"

import discsSaga from "./components/discs/discsSaga"
import userSaga from "./components/user/userSaga"

function* rootSaga() {
  yield all([fork(discsSaga), fork(userSaga)])
}

export default rootSaga
