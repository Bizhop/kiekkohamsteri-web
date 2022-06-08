import { prepend, path } from "ramda"
import { removeFromArrayById } from "../shared/utils"
import { OMAT_OSTOT_SUCCESS, OSTA_FAILURE, OSTA_SUCCESS, PERUUTA_OSTO_SUCCESS } from "./ostoActions"

const initialState = {
  data: {
    myyjana: [],
    ostajana: []
  },
  error: null
}

const ostoReducer = (state = initialState, action) => {
  switch (action.type) {
    case OMAT_OSTOT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: null
      }
    case OSTA_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ostajana: prepend(action.payload.data, state.data.ostajana)
        },
        error: null
      }
    case OSTA_FAILURE:
      return {
        ...state,
        error: "Olet jo ostamassa tätä kiekkoa"
      }
    case PERUUTA_OSTO_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ostajana: removeFromArrayById(state.data.ostajana, path(["meta", "previousAction", "id"], action))
        },
        error: null
      }
    default:
      return state
  }
}

export default ostoReducer
