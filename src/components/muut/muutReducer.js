import { getSortColumn } from "../shared/utils"
import { STATS_REQUEST, STATS_SUCCESS } from "./muutActions"

const initialState = {
  stats: null,
  sortColumn: "Kuukausi",
}

const muutReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATS_REQUEST:
      return {
        ...state,
        stats: null,
        sortColumn: "Kuukausi",
      }
    case STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload.data.content,
        sortColumn: getSortColumn(action),
      }
    default:
      return state
  }
}

export default muutReducer
