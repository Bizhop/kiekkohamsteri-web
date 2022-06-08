import { fork } from "redux-saga/effects"

import kiekkoSaga from "./components/kiekko/kiekkoSaga"
import myytavatSaga from "./components/myytavat/myytavatSaga"
import ratingSaga from "./components/rating/ratingSaga"
import ostoSaga from "./components/osto/ostoSaga"
import muutSaga from "./components/muut/muutSaga"

function* rootSaga() {
  yield fork(kiekkoSaga)
  yield fork(myytavatSaga)
  yield fork(ratingSaga)
  yield fork(ostoSaga)
  yield fork(muutSaga)
}

export default rootSaga
