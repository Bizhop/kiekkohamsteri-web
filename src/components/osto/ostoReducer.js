import { prepend, pathOr } from "ramda"
import { removeFromArrayById } from "../shared/utils"
import {
  HYVAKSY_OSTO_SUCCESS,
  OMAT_OSTOT_SUCCESS,
  OSTA_FAILURE,
  OSTA_SUCCESS,
  PERUUTA_OSTO_SUCCESS,
} from "./ostoActions"
import { toast } from "react-toastify"

const initialState = {
  data: {
    myyjana: [],
    ostajana: [],
  },
}

const ostoReducer = (state = initialState, action) => {
  switch (action.type) {
    case OMAT_OSTOT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      }
    case OSTA_SUCCESS:
      toast.success("Ostopyyntö rekisteröity")
      return {
        ...state,
        data: {
          ...state.data,
          ostajana: prepend(action.payload.data, state.data.ostajana),
        },
      }
    case OSTA_FAILURE:
      toast.error("Olet jo ostamassa tätä kiekkoa")
      return state
    case PERUUTA_OSTO_SUCCESS:
      toast.info("Osto peruutettu")
      return {
        ...state,
        data: {
          ostajana: removeFromArrayById(
            state.data.ostajana,
            pathOr(-1, ["meta", "previousAction", "id"], action)
          ),
          myyjana: removeFromArrayById(
            state.data.myyjana,
            pathOr(-1, ["meta", "previousAction", "id"], action)
          ),
        },
      }
    case HYVAKSY_OSTO_SUCCESS:
      toast.success("Osto hyväksytty")
      return {
        ...state,
        data: {
          ostajana: removeFromArrayById(
            state.data.ostajana,
            pathOr(-1, ["meta", "previousAction", "id"], action)
          ),
          myyjana: removeFromArrayById(
            state.data.myyjana,
            pathOr(-1, ["meta", "previousAction", "id"], action)
          ),
        },
      }
    default:
      return state
  }
}

export default ostoReducer
