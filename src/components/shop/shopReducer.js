import { prepend, pathOr } from "ramda"
import { toast } from "react-toastify"

import { removeFromArrayById } from "../shared/utils"
import { BUY_FAILURE, BUY_SUCCESS, CONFIRM_BUY_SUCCESS, FOR_SALE_REQUEST, FOR_SALE_SUCCESS, OWN_BUYS_SUCCESS, REJECT_BUY_SUCCESS } from "./shopActions"

const initialState = {
  forSale: [],
  sort: {},
  pagination: {},
  asBuyer: [],
  asSeller: [],
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOR_SALE_REQUEST:
      return {
        ...state,
        sort: action.sort,
        pagination: action.pagination
      }
    case FOR_SALE_SUCCESS:
      return {
        ...state,
        forSale: action.payload.data.content
      }
    case OWN_BUYS_SUCCESS:
      return {
        ...state,
        asBuyer: action.payload.data.asBuyer,
        asSeller: action.payload.data.asSeller
      }
    case BUY_SUCCESS:
      toast.success("Ostopyyntö rekisteröity")
      return {
        ...state,
        asBuyer: prepend(action.payload.data, state.asBuyer)
      }
    case BUY_FAILURE:
      toast.error("Olet jo ostamassa tätä kiekkoa")
      return state
    case REJECT_BUY_SUCCESS:
      toast.info("Osto peruutettu")
      return {
        ...state,
        asBuyer: removeFromArrayById(
          state.data.asBuyer,
          pathOr(-1, ["meta", "previousAction", "id"], action)
        ),
        asSeller: removeFromArrayById(
          state.data.asSeller,
          pathOr(-1, ["meta", "previousAction", "id"], action)
        )
      }
    case CONFIRM_BUY_SUCCESS:
      toast.success("Osto hyväksytty")
      return {
        ...state,
        asBuyer: removeFromArrayById(
          state.data.asBuyer,
          pathOr(-1, ["meta", "previousAction", "id"], action)
        ),
        asSeller: removeFromArrayById(
          state.data.asSeller,
          pathOr(-1, ["meta", "previousAction", "id"], action)
        )
      }
    default:
      return state
  }
}

export default shopReducer
