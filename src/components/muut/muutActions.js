import { getPayload } from "../Api"

export const STATS_REQUEST = "stats/GET"
export const STATS_SUCCESS = "stats/GET_SUCCESS"
export const STATS_FAILURE = "stats/GET_FAIL"

export const getStats = params => ({
  type: STATS_REQUEST,
  payload: getPayload({ url: `api/stats?size=1000&sort=${params.sort}` }),
  params,
})
