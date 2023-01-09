import { getPayload, putPayload, postPayload, patchPayload, deletePayload } from "../Api"
import { pick } from "ramda"
import { pagingAndSortingQueryParams } from "../shared/utils"

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
export const UPLOAD_IMAGE = "discs/UPLOAD_IMAGE"
export const UPLOAD_IMAGE_API = "discs/UPLOAD_IMAGE_API"
export const UPLOAD_IMAGE_API_SUCCESS = "discs/UPLOAD_IMAGE_API_SUCCESS"
export const UPLOAD_IMAGE_API_FAILURE = "discs/UPLOAD_IMAGE_API_FAIL"
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

export const getDiscs = ({ sort, pagination }) => ({
  type: DISCS_REQUEST,
  payload: getPayload({ url: `api/v2/discs?${pagingAndSortingQueryParams(sort, pagination)}` }),
  sort,
  pagination,
})

export const getOtherUserDiscs = ({ sort, pagination, userId }) => ({
  type: OTHER_USER_DISCS,
  payload: getPayload({
    url: `api/v2/discs?userId=${userId}&${pagingAndSortingQueryParams(sort, pagination)}`,
  }),
  sort,
  pagination,
  userId,
})

export const getDisc = id => ({
  type: DISC_REQUEST,
  payload: getPayload({ url: `api/v2/discs/${id}` }),
  id,
})

export const updateDisc = disc => ({
  type: UPDATE_DISC_REQUEST,
  payload: putPayload({ url: `api/v2/discs/${disc.id}`, data: pick(updateFields, disc) }),
  disc,
})

export const toggleEditModal = disc => ({
  type: TOGGLE_DISC_EDIT_MODAL,
  disc,
})

export const uploadImageApi = data => ({
  type: UPLOAD_IMAGE_API,
  payload: postPayload({ url: "api/v2/discs", data }),
  data,
})

export const updateImageApi = ({ id, data }) => ({
  type: UPDATE_IMAGE_API,
  payload: patchPayload({ url: `api/v2/discs/${id}/update-image`, data: data }),
  data,
})

export const deleteDisc = id => ({
  type: DELETE_DISC,
  payload: deletePayload({ url: `api/v2/discs/${id}` }),
  id,
})

export const getLost = ({ sort, pagination }) => ({
  type: LOST_REQUEST,
  payload: getPayload({
    url: `api/v2/discs/lost?${pagingAndSortingQueryParams(sort, pagination)}`,
  }),
  sort,
  pagination,
})

export const found = id => ({
  type: FOUND_REQUEST,
  payload: patchPayload({ url: `api/v2/discs/${id}/found` }),
  id,
})

export const getDiscSearchOperations = () => ({
  type: SEARCH_DISCS_OPERATIONS_REQUEST,
  payload: getPayload({ url: "api/v2/discs/search" }),
})

export const search = ({ filters, sort, pagination }) => ({
  type: SEARCH_DISCS_REQUEST,
  payload: postPayload({
    url: `api/v2/discs/search?${pagingAndSortingQueryParams(sort, pagination)}`,
    data: { criteria: filters },
  }),
  sort,
  pagination,
  filters,
})
