import { DROPDOWNS_SUCCESS, DROPDOWNS_FAILURE } from './dropdownActions'

const initialState = {
  dropdowns: {
    molds: [],
    valms: [],
    muovit: [],
    varit: [],
    kunto: [],
    tussit: []
  },
  error: null
}

const dropdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case DROPDOWNS_FAILURE:
      return {
        ...initialState,
        error: action.error,
      }
    case DROPDOWNS_SUCCESS:
      return {
        ...state,
        dropdowns: action.payload.data,
      }
    default:
      return state
  }
}

export default dropdownReducer
