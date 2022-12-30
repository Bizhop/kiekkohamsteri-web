import { getPayload } from "../Api"
import { pagingAndSortingQueryParams } from "../shared/utils"

export const MYYTAVAT_REQUEST = "myytavat/GET"
export const MYYTAVAT_SUCCESS = "myytavat/GET_SUCCESS"
export const MYYTAVAT_FAILURE = "myytavat/GET_FAIL"

export const getMyytavat = ({ sort, pagination }) => ({
  type: MYYTAVAT_REQUEST,
  payload: getPayload({
    url: `api/kiekot/myytavat?${pagingAndSortingQueryParams(sort, pagination)}`,
  }),
  sort,
  pagination,
})
