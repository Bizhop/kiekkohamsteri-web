import { all, call, put, takeEvery } from "redux-saga/effects"

import Api from "../Api"
import {
  RATING_REQUEST,
  ratingSuccess,
  ratingError,
  CUSTOM_RATING_REQUEST,
  customRatingSuccess,
  customRatingFailure
} from "./ratingActions"

function* getRatingSaga(action) {
  try {
    const response = yield call(Api.get, `api/rating/${action.pdga}`)
    yield put(ratingSuccess(response))
  } catch (e) {
    yield put(ratingError(e))
  }
}

function* getCustomRatingSaga(action) {
  try {
    const param = action.form.byRoundsOnly ? "?byRoundsOnly=true" : ""
    const response = yield call(Api.post, "api/rating" + param, action.form.rounds)
    yield put(customRatingSuccess(response))
  } catch (e) {
    yield put(customRatingFailure(e))
  }
}

function* ratingSaga() {
  yield all([
    takeEvery(RATING_REQUEST, getRatingSaga),
    takeEvery(CUSTOM_RATING_REQUEST, getCustomRatingSaga)
  ])
}

export default ratingSaga
