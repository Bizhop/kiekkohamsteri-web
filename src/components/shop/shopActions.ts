import { action } from "typesafe-actions"
import { IPagination, IResponsePagedPayload, IResponsePayload, ISort, TBuy, TBuySummary, TDisc } from "../../types"
import { getPayload, getPayloadTs, postPayload, postPayloadTs } from "../Api"
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

export const getForSale = (sort: ISort, pagination: IPagination) => action(
  FOR_SALE_REQUEST,
  getPayloadTs(`api/v2/discs/for-sale?${pagingAndSortingQueryParams(sort, pagination)}`),
  { sort, pagination }
)
export const getForSaleSuccess = (payload: IResponsePagedPayload<TDisc>) => action(FOR_SALE_SUCCESS, payload)
export const getForSaleFailure = () => (FOR_SALE_FAILURE)

export const getOwnBuys = () => action(OWN_BUYS_REQUEST, getPayloadTs("api/v2/buys/own"))
export const getOwnBuysSuccess = (payload: IResponsePayload<TBuySummary>) => action(OWN_BUYS_SUCCESS, payload)
export const getOwnBuysFailure = () => action(OWN_BUYS_FAILURE)

export const buyDisc = (uuid: string) => action(BUY_REQUEST, postPayloadTs(`api/v2/discs/${uuid}/buy`, null), { uuid })
export const buyDiscSuccess = (payload: IResponsePayload<TBuy>) => action(BUY_SUCCESS, payload)
export const buyDiscFailure = () => action(BUY_FAILURE)

export const rejectBuy = (id: number) => action(REJECT_BUY_REQUEST, postPayloadTs(`api/v2/buys/${id}/reject`, null), { id })
export const rejectBuySuccess = () => action(REJECT_BUY_SUCCESS)
export const rejectBuyFailure = () => action(REJECT_BUY_FAILURE)

export const confirmBuy = (id: number) => action(CONFIRM_BUY_REQUEST, postPayloadTs(`api/v2/buys/${id}/confirm`, null), { id })
export const confirmBuySuccess = () => action(CONFIRM_BUY_SUCCESS)
export const confirmBuyFailure = () => action(CONFIRM_BUY_FAILURE)
