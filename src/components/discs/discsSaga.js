import { all, put, takeEvery } from "redux-saga/effects"

import { TOGGLE_DISC_EDIT_MODAL } from "./discsActions"
import { getDropdownsByManufacturer } from "../dropdown/dropdownActions"

function* toggleEditModalSaga(action) {
  if (action.payload.disc) {
    yield put(getDropdownsByManufacturer(action.payload.disc.mold.manufacturer.id))
  }
}

function* discsSaga() {
  yield all([takeEvery(TOGGLE_DISC_EDIT_MODAL, toggleEditModalSaga)])
}

export default discsSaga
