import { OMAT_OSTOT_SUCCESS } from "./ostoActions"

const initialState = {
  data: null
}

const ostoReducer = (state = initialState, action) => {
  switch (action.type) {
    case OMAT_OSTOT_SUCCESS:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}

export default ostoReducer
