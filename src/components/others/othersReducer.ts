import { IStatsState, OthersActions } from "../../types"
import { defaultPagination } from "../shared/constants"
import { STATS_FAILURE, STATS_REQUEST, STATS_SUCCESS } from "./othersActions"

export const defaultStatsSort = {
  sort: "year,desc&sort=month,desc",
  column: "Kuukausi"
}

export const defaultStatsPagination = {
  ...defaultPagination,
  size: 1000
}

const initialState: IStatsState = {
  stats: [],
  sort: defaultStatsSort,
  fetching: false
}

const othersReducer = (state: IStatsState = initialState, action: OthersActions) => {
  switch (action.type) {
    case STATS_REQUEST:
      return {
        ...state,
        fetching: true,
        stats: [],
        sort: action.meta.sort
      }
    case STATS_SUCCESS:
      return {
        ...state,
        fetching: false,
        stats: action.payload.data.content,
      }
    case STATS_FAILURE:
      return {
        ...state,
        fetching: false,
        stats: []
      }
    default:
      return state
  }
}

export default othersReducer
