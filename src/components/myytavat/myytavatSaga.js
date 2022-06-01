import { call, put, takeEvery } from "redux-saga/effects"
import { path } from "ramda"

import Api from "../Api"
import { MYYTAVAT_REQUEST, myytavatSuccess, myytavatError } from "./myytavatActions"
import { logout } from "../user/userActions"

function* getMyytavatSaga(action) {
  try {
    const response = yield call(Api.get, "api/kiekot/myytavat", {
      params: {
        size: 1000,
        sort: path(["params", "sort"], action)
      }
    })
    yield put(
      myytavatSuccess({
        myytavat: response.content,
        newSortColumn: action.params.newSortColumn
      })
    )
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(myytavatError(e))
    }
  }
}

function* myytavatSaga() {
  yield takeEvery(MYYTAVAT_REQUEST, getMyytavatSaga)
}

export default myytavatSaga
