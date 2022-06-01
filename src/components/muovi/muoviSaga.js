import { all, call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import {
  MUOVIT_REQUEST,
  MUOVIT_BY_VALMISTAJA_REQUEST,
  muovitSuccess,
  muovitFailure,
  CREATE_MUOVI_REQUEST,
  getMuovitByValmistaja,
  createMuoviFailure,
} from './muoviActions'
import { logout } from '../user/userActions'

function* getMuovitSaga() {
  try {
    const response = yield call(Api.get, 'api/muovit', {
      params: {
        size: 1000,
        sort: 'muovi,asc',
      },
    })
    yield put(muovitSuccess(response))
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(muovitFailure(e))
    }
  }
}

function* getMuovitByValmistajaSaga(action) {
  try {
    const response = yield call(Api.get, 'api/muovit', {
      params: {
        size: 1000,
        sort: 'muovi,asc',
        valmId: action.valmId,
      },
    })
    yield put(muovitSuccess(response))
  } catch (e) {
    yield put(muovitFailure(e))
  }
}

function* createMuoviSaga(action) {
  try {
    yield call(Api.post, 'api/muovit', action.muovi)
    yield put(getMuovitByValmistaja(action.muovi.valmId))
  } catch (e) {
    yield put(createMuoviFailure(e))
  }
}

function* muoviSaga() {
  yield all([
    takeEvery(MUOVIT_REQUEST, getMuovitSaga),
    takeEvery(MUOVIT_BY_VALMISTAJA_REQUEST, getMuovitByValmistajaSaga),
    takeEvery(CREATE_MUOVI_REQUEST, createMuoviSaga),
  ])
}

export default muoviSaga
