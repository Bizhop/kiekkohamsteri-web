import { action } from "typesafe-actions"

import { getPayloadTs } from "../Api"
import { IPagination, IResponsePagedPayload, ISort, TStats } from "../../types"
import { pagingAndSortingQueryParams } from "../shared/utils"

export const STATS_REQUEST = "stats/GET"
export const STATS_SUCCESS = "stats/GET_SUCCESS"
export const STATS_FAILURE = "stats/GET_FAIL"

export const getStats = (sort: ISort, pagination: IPagination) => action(STATS_REQUEST, getPayloadTs(`api/v2/stats?${pagingAndSortingQueryParams(sort, pagination)}`), { sort, pagination })
export const getStatsSuccess = (payload: IResponsePagedPayload<TStats>) => action(STATS_SUCCESS, payload)
export const getStatsFailure = () => action(STATS_FAILURE)
