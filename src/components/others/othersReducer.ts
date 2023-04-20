import { IStatsSate, OthersActions } from "../../types"
import { defaultPagination } from "../shared/constants"
import { STATS_REQUEST, STATS_SUCCESS } from "./othersActions"

export const defaultStatsSort = {
  sort: "year,desc&sort=month,desc",
  column: "Kuukausi"
}

export const defaultStatsPagination = {
  ...defaultPagination,
  size: 1000
}

const initialState: IStatsSate = {
  stats: null,
  sort: defaultStatsSort
}

const othersReducer = (state: IStatsSate = initialState, action: OthersActions) => {
  switch (action.type) {
    case STATS_REQUEST:
      return {
        ...state,
        stats: null,
        sort: action.meta.sort
      }
    case STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload.data.content,
      }
    default:
      return state
  }
}

export default othersReducer
