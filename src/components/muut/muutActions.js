export const STATS_REQUEST = "STATS_REQUEST"
export const STATS_SUCCESS = "STATS_SUCCESS"
export const STATS_FAILURE = "STATS_FAILURE"

export const getStats = params => ({
  type: STATS_REQUEST,
  params
})

export const statsSuccess = params => ({
  type: STATS_SUCCESS,
  params
})

export const statsError = error => ({
  type: STATS_FAILURE,
  error
})
