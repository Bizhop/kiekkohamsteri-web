import {
  MOLDS_BY_VALMISTAJA_REQUEST,
  MOLDS_SUCCESS,
  MOLDS_FAILURE,
  TOGGLE_CREATE_MODAL,
} from './moldActions'

const initialState = {
  molds: {
    content: [],
  },
  isCreateOpen: false,
  valmId: null,
}

const moldReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOLDS_BY_VALMISTAJA_REQUEST:
      return {
        ...state,
        valmId: action.valmId,
        isCreateOpen: false,
      }
    case MOLDS_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case MOLDS_SUCCESS:
      return {
        ...state,
        molds: action.molds,
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
