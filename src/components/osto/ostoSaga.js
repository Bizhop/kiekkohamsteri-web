import { call, put, takeEvery, take, all } from "redux-saga/effects"

import Api from "../Api"
import {
  OMAT_OSTOT_REQUEST,
  omatSuccess,
  omatFailure,
  BUY_DISC_REQUEST,
  buyDiscSuccess,
  buyDiscFailure,
  HYVAKSY_OSTO_REQUEST,
  hyvaksyOstoSuccess,
  hyvaksyOstoFailure,
  PERUUTA_OSTO_REQUEST,
  peruutaOstoSuccess,
  peruutaOstoFailure,
  getOmat
} from "./ostoActions"
import { logout } from "../user/userActions"

function* getOmatSaga(action) {
  try {
    const response = yield call(Api.get, "api/ostot/omat")
    yield put(omatSuccess(response))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(omatFailure(e))
    }
  }
}

function* buyDiscSaga(action) {
  try {
    yield call(Api.post, `api/kiekot/${action.id}/buy`)
    yield put(getOmat())
    yield put(buyDiscSuccess())
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(buyDiscFailure(e))
    }
  }
}

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

function* peruutaOstoSaga(action) {
  try {
    yield call(Api.post, `api/ostot/${action.id}/reject`)
    yield put(getOmat())
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(peruutaOstoFailure(e))
    }
  }
}

function* ostoSaga() {
  yield all([
    takeEvery(OMAT_OSTOT_REQUEST, getOmatSaga),
    takeEvery(BUY_DISC_REQUEST, buyDiscSaga),
    takeEvery(HYVAKSY_OSTO_REQUEST, hyvaksyOstoSaga),
    takeEvery(PERUUTA_OSTO_REQUEST, peruutaOstoSaga)
  ])
}

export default ostoSaga
