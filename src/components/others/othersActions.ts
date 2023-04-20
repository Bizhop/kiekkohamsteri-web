import { action } from "typesafe-actions"

import { getPayloadTs } from "../Api"
import { IResponsePagedPayload, ISort, TStats } from "../../types"

export const STATS_REQUEST = "stats/GET"
export const STATS_SUCCESS = "stats/GET_SUCCESS"
export const STATS_FAILURE = "stats/GET_FAIL"

export const getStats = (sort: ISort) => action(STATS_REQUEST, getPayloadTs(`api/v2/stats?size=1000&sort=${sort.sort}`), { sort })
export const getStatsSuccess = (payload: IResponsePagedPayload<TStats>) => action(STATS_SUCCESS, payload)
export const getStatsFailure = () => action(STATS_FAILURE)
