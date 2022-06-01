import { call, put, takeEvery } from "redux-saga/effects"

import Api from "../Api"
import { STATS_REQUEST, statsSuccess, statsError } from "./muutActions"
import { logout } from "../user/userActions"

function* getStatsSaga(action) {
  try {
    const response = yield call(Api.get, `api/stats?size=1000&sort=${action.params.sort}`)
    yield put(
      statsSuccess({
        stats: response.content,
        newSortColumn: action.params.newSortColumn
      })
    )
  } catch (e) {
    if (e.response.status === 403) {
      yield put(logout())
    } else {
      yield put(statsFailure(e))
    }
  }
}

function* muutSaga() {
  yield takeEvery(STATS_REQUEST, getStatsSaga)
}

export default muutSaga
