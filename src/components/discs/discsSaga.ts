import { all, put, takeEvery } from "redux-saga/effects"
import { pathOr } from "ramda"
import { ActionType } from "typesafe-actions"

import { TOGGLE_DISC_EDIT_MODAL, toggleEditModal } from "./discsActions"
import { getDropdownsByManufacturer } from "../dropdown/dropdownActions"

type ToggleEditModalAction = ActionType<typeof toggleEditModal>

function* toggleEditModalSaga(action: ToggleEditModalAction) {
  if (action.payload.disc) {
    yield put(getDropdownsByManufacturer(pathOr(-1, ["payload", "disc", "mold", "manufacturer", "id"], action)))
  }
}

function* discsSaga() {
  yield all([takeEvery(TOGGLE_DISC_EDIT_MODAL, toggleEditModalSaga)])
}

export default discsSaga
