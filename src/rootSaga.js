import { fork } from "redux-saga/effects"

import kiekkoSaga from "./components/kiekko/kiekkoSaga"

function* rootSaga() {
  yield fork(kiekkoSaga)
}

export default rootSaga
