import { DROPDOWNS_REQUEST, DROPDOWNS_SUCCESS, DROPDOWNS_FAILURE } from './dropdownActions'

const initialState = {
  dropdowns: {},
}

const dropdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case DROPDOWNS_REQUEST:
      return {
        ...state,
      }
    case DROPDOWNS_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case DROPDOWNS_SUCCESS:
      return {
        ...state,
        dropdowns: action.dropdowns,
      }
    default:
      return state
  }
}

export default dropdownReducer
