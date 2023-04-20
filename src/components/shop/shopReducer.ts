import { prepend, pathOr } from "ramda"
import { toast } from "react-toastify"

import { removeFromArrayById } from "../shared/utils"
import {
  BUY_FAILURE,
  BUY_SUCCESS,
  CONFIRM_BUY_SUCCESS,
  FOR_SALE_REQUEST,
  FOR_SALE_SUCCESS,
  OWN_BUYS_SUCCESS,
  REJECT_BUY_SUCCESS,
} from "./shopActions"
import { IShopState, ShopActions } from "../../types"
import { defaultPagination, defaultSort } from "../shared/constants"

const initialState: IShopState = {
  forSale: [],
  sort: defaultSort,
  pagination: defaultPagination,
  summary: {
    asBuyer: [],
    asSeller: []
  }
}

const shopReducer = (state: IShopState = initialState, action: ShopActions) => {
  switch (action.type) {
    case FOR_SALE_REQUEST:
      return {
        ...state,
        sort: action.meta.sort,
        pagination: action.meta.pagination,
      }
    case FOR_SALE_SUCCESS:
      return {
        ...state,
        forSale: action.payload.data.content,
      }
    case OWN_BUYS_SUCCESS:
      return {
        ...state,
        summary: action.payload.data
      }
    case BUY_SUCCESS:
      toast.success("Ostopyyntö rekisteröity")
      return {
        ...state,
        summary: {
          ...state.summary,
          asBuyer: prepend(action.payload.data, state.summary.asBuyer),
        }
      }
    case BUY_FAILURE:
      toast.error("Olet jo ostamassa tätä kiekkoa")
      return state
    case REJECT_BUY_SUCCESS:
      toast.info("Osto peruutettu")
      return {
        ...state,
        summary: {
          asBuyer: removeFromArrayById(
            state.summary.asBuyer,
            pathOr(-1, ["meta", "previousAction", "id"], action)
          ),
          asSeller: removeFromArrayById(
            state.summary.asSeller,
            pathOr(-1, ["meta", "previousAction", "id"], action)
          ),
        }
      }
    case CONFIRM_BUY_SUCCESS:
      toast.success("Osto hyväksytty")
      return {
        ...state,
        summary: {
          asBuyer: removeFromArrayById(
            state.summary.asBuyer,
            pathOr(-1, ["meta", "previousAction", "id"], action)
          ),
          asSeller: removeFromArrayById(
            state.summary.asSeller,
            pathOr(-1, ["meta", "previousAction", "id"], action)
          ),
        }
      }
    default:
      return state
  }
}

export default shopReducer
