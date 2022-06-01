import {
  MUOVIT_BY_VALMISTAJA_REQUEST,
  MUOVIT_SUCCESS,
  MUOVIT_FAILURE,
  TOGGLE_CREATE_MODAL,
} from './muoviActions'

const initialState = {
  muovit: {
    content: [],
  },
  isCreateOpen: false,
  valmId: null,
}

const muoviReducer = (state = initialState, action) => {
  switch (action.type) {
    case MUOVIT_BY_VALMISTAJA_REQUEST:
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
        muovit: action.muovit,
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
