import { prepend } from "ramda"

import {
  MUOVIT_REQUEST,
  MUOVIT_SUCCESS,
  MUOVIT_FAILURE,
  CREATE_MUOVI_SUCCESS,
  TOGGLE_CREATE_MODAL,
} from "./plasticsActions"

const initialState = {
  plastics: {
    content: [],
  },
  isCreateOpen: false,
  manufacturerId: null,
}

const muoviReducer = (state = initialState, action) => {
  switch (action.type) {
    case MUOVIT_REQUEST:
      return {
        ...state,
        manufacturerId: action.manufacturerId,
        isCreateOpen: false,
      }
    case MUOVIT_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case MUOVIT_SUCCESS:
      return {
        ...state,
        plastics: action.payload.data,
      }
    case CREATE_MUOVI_SUCCESS: {
      return {
        ...state,
        plastics: {
          ...state.plastics,
          content: prepend(action.payload.data, state.plastics.content),
        },
        isCreateOpen: false,
      }
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

export default muoviReducer
