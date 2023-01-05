import { prepend } from "ramda"

import {
  CREATE_MOLD_SUCCESS,
  MOLDS_REQUEST,
  MOLDS_SUCCESS,
  TOGGLE_CREATE_MODAL,
} from "./moldActions"

const initialState = {
  molds: {
    content: [],
  },
  isCreateOpen: false,
  manufacturerId: null,
}

const moldReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOLDS_REQUEST:
      return {
        ...state,
        manufacturerId: action.manufacturerId,
        isCreateOpen: false,
      }
    case MOLDS_SUCCESS:
      return {
        ...state,
        molds: action.payload.data,
      }
    case CREATE_MOLD_SUCCESS:
      return {
        ...state,
        molds: {
          ...state.molds,
          content: prepend(action.payload.data, state.molds.content),
        },
        isCreateOpen: false,
      }
    case TOGGLE_CREATE_MODAL:
      return {
        ...state,
        isCreateOpen: !state.isCreateOpen,
      }
    default:
      return state
  }
}

export default moldReducer
