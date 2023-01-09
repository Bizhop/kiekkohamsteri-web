import { DROPDOWNS_SUCCESS, DROPDOWNS_FAILURE } from "./dropdownActions"

const initialState = {
  dropdowns: {
    molds: [],
    manufacturers: [],
    plastics: [],
    colors: [],
    conditions: [],
    markings: [],
  },
}

const dropdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case DROPDOWNS_FAILURE:
      return initialState
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
