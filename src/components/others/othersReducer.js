import { STATS_REQUEST, STATS_SUCCESS } from "./othersActions"

const initialState = {
  stats: null,
  statsSort: {
    sort: "year,desc&sort=month,desc",
    column: "Kuukausi",
  },
}

const othersReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATS_REQUEST:
      return {
        ...state,
        stats: null,
        statsSort: action.params.sort,
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
