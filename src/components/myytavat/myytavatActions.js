import { getPayload } from "../Api"

export const MYYTAVAT_REQUEST = "myytavat/GET"
export const MYYTAVAT_SUCCESS = "myytavat/GET_SUCCESS"
export const MYYTAVAT_FAILURE = "myytavat/GET_FAIL"

export const getMyytavat = params => ({
  type: MYYTAVAT_REQUEST,
  payload: getPayload({ url: `api/kiekot/myytavat?size=1000&sort=${params.sort}` }),
  params,
})
