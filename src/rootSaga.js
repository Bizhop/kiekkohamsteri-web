import { fork } from "redux-saga/effects"

import userSaga from "./components/user/userSaga"
import moldSaga from "./components/mold/moldSaga"
import dropdownSaga from "./components/dropdown/dropdownSaga"
import muoviSaga from "./components/muovi/muoviSaga"
import kiekkoSaga from "./components/kiekko/kiekkoSaga"
import myytavatSaga from "./components/myytavat/myytavatSaga"
import ratingSaga from "./components/rating/ratingSaga"
import ostoSaga from "./components/osto/ostoSaga"
import muutSaga from "./components/muut/muutSaga"

function* rootSaga() {
  yield fork(userSaga)
  yield fork(moldSaga)
  yield fork(dropdownSaga)
  yield fork(muoviSaga)
  yield fork(kiekkoSaga)
  yield fork(myytavatSaga)
  yield fork(ratingSaga)
  yield fork(ostoSaga)
  yield fork(muutSaga)
}

export default rootSaga
