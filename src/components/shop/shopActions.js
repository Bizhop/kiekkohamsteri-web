import { getPayload, postPayload } from "../Api"
import { pagingAndSortingQueryParams } from "../shared/utils"

export const FOR_SALE_REQUEST = "forSale/GET"
export const FOR_SALE_SUCCESS = "forSale/GET_SUCCESS"
export const FOR_SALE_FAILURE = "forSale/GET_FAIL"
export const OWN_BUYS_REQUEST = "buys/OWN"
export const OWN_BUYS_SUCCESS = "buys/OWN_SUCCESS"
export const OWN_BUYS_FAILURE = "buys/OWN_FAIL"
export const BUY_REQUEST = "buys/BUY"
export const BUY_SUCCESS = "buys/BUY_SUCCESS"
export const BUY_FAILURE = "buys/BUY_FAIL"
export const REJECT_BUY_REQUEST = "buys/REJECT"
export const REJECT_BUY_SUCCESS = "buys/REJECT_SUCCESS"
export const REJECT_BUY_FAILURE = "buys/REJECT_FAIL"
export const CONFIRM_BUY_REQUEST = "buys/CONFIRM"
export const CONFIRM_BUY_SUCCESS = "buys/CONFIRM_SUCCESS"
export const CONFIRM_BUY_FAILURE = "buys/CONFIRM_FAIL"

export const getForSale = ({ sort, pagination }) => ({
  type: FOR_SALE_REQUEST,
  payload: getPayload({
    url: `api/v2/discs/for-sale?${pagingAndSortingQueryParams(sort, pagination)}`,
  }),
  sort,
  pagination,
})

export const getOwnBuys = () => ({
  type: OWN_BUYS_REQUEST,
  payload: getPayload({ url: "api/v2/buys/own" }),
})

export const buyDisc = id => ({
  type: BUY_REQUEST,
  payload: postPayload({ url: `api/v2/discs/${id}/buy` }),
  id,
})

export const rejectBuy = id => ({
  type: REJECT_BUY_REQUEST,
  payload: postPayload({ url: `api/v2/buys/${id}/reject` }),
  id,
})

export const confirmBuy = id => ({
  type: CONFIRM_BUY_REQUEST,
  payload: postPayload({ url: `api/v2/buys/${id}/confirm` }),
  id,
})
