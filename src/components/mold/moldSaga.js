import { all, call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import {
  MOLDS_REQUEST,
  MOLDS_BY_VALMISTAJA_REQUEST,
  CREATE_MOLD_REQUEST,
  getMoldsByValmistaja,
  moldsSuccess,
  moldsFailure,
  createMoldFailure,
} from './moldActions'
import { logout } from '../user/userActions'

function* getMoldsSaga() {
  try {
    const response = yield call(Api.get, 'api/molds', {
      params: {
        size: 1000,
        sort: 'kiekko,asc',
      },
    })
    yield put(moldsSuccess(response))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(moldsFailure(e))
    }
  }
}

function* getMoldsByValmistajaSaga(action) {
  try {
    const response = yield call(Api.get, 'api/molds', {
      params: {
        size: 1000,
        sort: 'kiekko,asc',
        valmId: action.valmId,
      },
    })
    yield put(moldsSuccess(response))
  } catch (e) {
    yield put(moldsFailure(e))
  }
}

function* createMoldSaga(action) {
  try {
    yield call(Api.post, 'api/molds', action.mold)
    yield put(getMoldsByValmistaja(action.mold.valmId))
  } catch (e) {
    yield put(createMoldFailure(e))
  }
}

function* moldSaga() {
  yield all([
    takeEvery(MOLDS_REQUEST, getMoldsSaga),
    takeEvery(MOLDS_BY_VALMISTAJA_REQUEST, getMoldsByValmistajaSaga),
    takeEvery(CREATE_MOLD_REQUEST, createMoldSaga),
  ])
}

export default moldSaga
