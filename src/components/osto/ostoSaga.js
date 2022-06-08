import { call, put, takeEvery, all } from "redux-saga/effects"

import Api from "../Api"
import {
  HYVAKSY_OSTO_REQUEST,
  hyvaksyOstoFailure,
  PERUUTA_OSTO_REQUEST,
  peruutaOstoFailure,
  getOmat
} from "./ostoActions"
import { logout } from "../user/userActions"

function* hyvaksyOstoSaga(action) {
  try {
    yield call(Api.post, `api/ostot/${action.id}/confirm`)
    yield put(getOmat())
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(hyvaksyOstoFailure(e))
    }
  }
}

function* ostoSaga() {
  yield takeEvery(HYVAKSY_OSTO_REQUEST, hyvaksyOstoSaga)
}

export default ostoSaga
