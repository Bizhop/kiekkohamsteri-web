import { prepend } from "ramda"

import {
  MUOVIT_REQUEST,
  MUOVIT_SUCCESS,
  MUOVIT_FAILURE,
  CREATE_MUOVI_SUCCESS,
  TOGGLE_CREATE_MODAL,
} from "./muoviActions"

const initialState = {
  muovit: {
    content: [],
  },
  isCreateOpen: false,
  valmId: null,
}

const muoviReducer = (state = initialState, action) => {
  switch (action.type) {
    case MUOVIT_REQUEST:
      return {
        ...state,
        valmId: action.valmId,
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
        muovit: action.payload.data,
      }
    case CREATE_MUOVI_SUCCESS: {
      return {
        ...state,
        muovit: {
          ...state.muovit,
          content: prepend(action.payload.data, state.muovit.content),
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
