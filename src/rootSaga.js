import { fork } from "redux-saga/effects"

import kiekkoSaga from "./components/kiekko/kiekkoSaga"
import ratingSaga from "./components/rating/ratingSaga"
import muutSaga from "./components/muut/muutSaga"

function* rootSaga() {
  yield fork(kiekkoSaga)
  yield fork(muutSaga)
}

export default rootSaga
