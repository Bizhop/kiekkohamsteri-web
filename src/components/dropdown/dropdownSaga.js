import { all, call, put, takeEvery } from 'redux-saga/effects'

import Api from '../Api'
import {
  DROPDOWNS_REQUEST,
  DROPDOWNS_BY_VALMISTAJA_REQUEST,
  dropdownsSuccess,
  dropdownsFailure,
} from './dropdownActions'

function* getDropdownsSaga() {
  try {
    const response = yield call(Api.get, 'api/dropdown')
    yield put(dropdownsSuccess(response))
  } catch (e) {
    yield put(dropdownsFailure(e))
  }
}

function* getDropdownsByValmistajaSaga(action) {
  try {
    const response = yield call(Api.get, 'api/dropdown', {
      params: {
        valmId: action.valmId,
      },
    })
    yield put(dropdownsSuccess(response))
  } catch (e) {
    yield put(dropdownsFailure(e))
  }
}

function* dropdownSaga() {
  yield all([
    takeEvery(DROPDOWNS_REQUEST, getDropdownsSaga),
    takeEvery(DROPDOWNS_BY_VALMISTAJA_REQUEST, getDropdownsByValmistajaSaga),
  ])
}

export default dropdownSaga
