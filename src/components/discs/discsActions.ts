import { action } from "typesafe-actions"

export const DISCS_REQUEST = "discs/GET"
export const DISCS_SUCCESS = "discs/GET_SUCCESS"
export const DISCS_FAILURE = "discs/GET_FAIL"
export const DISC_REQUEST = "discs/GET_ONE"
export const DISC_SUCCESS = "discs/GET_ONE_SUCCESS"
export const DISC_FAILURE = "discs/GET_ONE_FAIL"
export const SEARCH_DISCS_OPERATIONS_REQUEST = "discs/SEARCH_OPERATIONS"
export const SEARCH_DISCS_OPERATIONS_SUCCESS = "discs/SEARCH_OPERATIONS_SUCCESS"
export const SEARCH_DISCS_OPERATIONS_FAILURE = "discs/SEARCH_OPERATIONS_FAILURE"
export const SEARCH_DISCS_REQUEST = "discs/SEARCH"
export const SEARCH_DISCS_SUCCESS = "discs/SEARCH_SUCCESS"
export const SEARCH_DISCS_FAILURE = "discs/SEARCH_FAILURE"
export const TOGGLE_DISC_EDIT_MODAL = "discs/TOGGLE_EDIT_MODAL"
export const UPDATE_DISC_REQUEST = "discs/UPDATE"
export const UPDATE_DISC_SUCCESS = "discs/UPDATE_SUCCESS"
export const UPDATE_DISC_FAILURE = "discs/UPDATE_FAIL"
export const CREATE_DISC_REQUEST = "discs/CREATE_DISC"
export const CREATE_DISC_SUCCESS = "discs/CREATE_DISC_SUCCESS"
export const CREATE_DISC_FAILURE = "discs/CREATE_DISC_FAILURE"
export const DELETE_DISC = "discs/DELETE"
export const DELETE_DISC_SUCCESS = "discs/DELETE_SUCCESS"
export const DELETE_DISC_FAILURE = "discs/DELETE_FAIL"
export const UPDATE_IMAGE = "discs/UPDATE_IMAGE"
export const UPDATE_IMAGE_API = "discs/UPDATE_IMAGE_API"
export const UPDATE_IMAGE_API_SUCCESS = "discs/UPDATE_IMAGE_API_SUCCESS"
export const UPDATE_IMAGE_API_FAILURE = "discs/UPDATE_IMAGE_API_FAILURE"
export const LOST_REQUEST = "discs/GET_LOST"
export const LOST_SUCCESS = "discs/GET_LOST_SUCCESS"
export const LOST_FAILURE = "discs/GET_LOST_FAIL"
export const FOUND_REQUEST = "discs/FOUND"
export const FOUND_SUCCESS = "discs/FOUND_SUCCESS"
export const FOUND_FAILURE = "discs/FOUND_FAIL"
export const OTHER_USER_DISCS = "discs/GET_OTHER"
export const OTHER_USER_DISCS_SUCCESS = "discs/GET_OTHER_SUCCESS"
export const OTHER_USER_DISCS_FAILURE = "discs/GET_OTHER_FAIL"

import { getPayloadTs, putPayloadTs, postPayloadTs, patchPayloadTs, deletePayloadTs } from "../Api"
import { pick } from "ramda"
import { pagingAndSortingQueryParams } from "../shared/utils"
import { IPagination, IResponsePagedPayload, IResponsePayload, ISort, TDisc, TSearchCriteria, TSupportedOperation } from "../../types"

const updateFields = [
  "moldId",
  "plasticId",
  "colorId",
  "weight",
  "condition",
  "glow",
  "special",
  "dyed",
  "swirly",
  "markings",
  "forSale",
  "price",
  "description",
  "lostAndFound",
  "itb",
  "publicDisc",
  "lost",
]

export const getDiscs = (sort: ISort, pagination: IPagination) => action(
  DISCS_REQUEST,
  getPayloadTs(`api/v2/discs?${pagingAndSortingQueryParams(sort, pagination)}`),
  { sort, pagination }
)
export const getDiscsSuccess = (payload: IResponsePagedPayload<TDisc>) => action(DISCS_SUCCESS, payload)
export const getDiscsFailure = () => action(DISCS_FAILURE)

export const getOtherUserDiscs = (sort: ISort, pagination: IPagination, userId: number) => action(
  OTHER_USER_DISCS,
  getPayloadTs(`api/v2/discs?userId=${userId}&${pagingAndSortingQueryParams(sort, pagination)}`),
  { sort, pagination, userId }
)
export const getOtherUserDiscsSuccess = (payload: IResponsePagedPayload<TDisc>) => action(OTHER_USER_DISCS_SUCCESS, payload)
export const getOtherUserDiscsFailure = () => action(OTHER_USER_DISCS_FAILURE)

export const getDisc = (uuid: string) => action(DISC_REQUEST, getPayloadTs(`api/v2/discs/${uuid}`), { uuid })
export const getDiscSuccess = (payload: IResponsePayload<TDisc>) => action(DISC_SUCCESS, payload)
export const getDiscFailure = () => action(DISC_FAILURE)

export const updateDisc = (disc: TDisc) => action(UPDATE_DISC_REQUEST, putPayloadTs(`api/v2/discs/${disc.uuid}`, pick(updateFields, disc)), { disc })
export const updateDiscSuccess = (payload: IResponsePayload<TDisc>) => action(UPDATE_DISC_SUCCESS, payload)
export const updateDiscFailure = () => action(UPDATE_DISC_FAILURE)

export const createDisc = () => action(CREATE_DISC_REQUEST, postPayloadTs("api/v2/discs", null))
export const createDiscSuccess = (payload: IResponsePayload<TDisc>) => action(CREATE_DISC_SUCCESS, payload)
export const createDiscFailure = () => action(CREATE_DISC_FAILURE)

export const updateImageApi = (uuid: string, base64: string) => action(UPDATE_IMAGE_API, patchPayloadTs(`api/v2/discs/${uuid}/update-image`, { data: base64 }), { base64 })
export const updateImageApiSuccess = (payload: IResponsePayload<TDisc>) => action(UPDATE_IMAGE_API_SUCCESS, payload)
export const updateImageApiFailure = () => action(UPDATE_IMAGE_API_FAILURE)

export const deleteDisc = (uuid: string) => action(DELETE_DISC, deletePayloadTs(`api/v2/discs/${uuid}`), { uuid })
export const deleteDiscSuccess = () => action(DELETE_DISC_SUCCESS)
export const deleteDiscFailure = () => action(DELETE_DISC_FAILURE)

export const getLost = (sort: ISort, pagination: IPagination) => action(
  LOST_REQUEST,
  getPayloadTs(`api/v2/discs/lost?${pagingAndSortingQueryParams(sort, pagination)}`),
  { sort, pagination }
)
export const getLostSuccess = (payload: IResponsePagedPayload<TDisc>) => action(LOST_SUCCESS, payload)
export const getLostFailure = () => action(LOST_FAILURE)

export const found = (uuid: string) => action(FOUND_REQUEST, patchPayloadTs(`api/v2/discs/${uuid}/found`, null), { uuid })
export const foundSuccess = () => action(FOUND_SUCCESS)
export const foundFailure = () => action(FOUND_FAILURE)

export const getDiscSearchOperations = () => action(SEARCH_DISCS_OPERATIONS_REQUEST, getPayloadTs("api/v2/discs/search"))
export const getDiscSearchOperationsSuccess = (payload: IResponsePayload<TSupportedOperation[]>) => action(SEARCH_DISCS_OPERATIONS_SUCCESS, payload)
export const getDiscSearchOperationsFailure = () => action(SEARCH_DISCS_OPERATIONS_FAILURE)

export const search = (sort: ISort, pagination: IPagination, criteria: TSearchCriteria[]) => action(
  SEARCH_DISCS_REQUEST,
  postPayloadTs(`api/v2/discs/search?${pagingAndSortingQueryParams(sort, pagination)}`, { criteria }),
  { sort, pagination, criteria }
)
export const searchSuccess = (payload: IResponsePagedPayload<TDisc>) => action(SEARCH_DISCS_SUCCESS, payload)
export const searchFailure = () => action(SEARCH_DISCS_FAILURE)

export const toggleEditModal = (disc: TDisc | null) => action(TOGGLE_DISC_EDIT_MODAL, { disc })
