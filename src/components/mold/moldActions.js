import { getPayload, postPayload } from "../Api"

export const MOLDS_REQUEST = "molds/GET"
export const MOLDS_SUCCESS = "molds/GET_SUCCESS"
export const MOLDS_FAILURE = "molds/GET_FAIL"
export const CREATE_MOLD_REQUEST = "molds/CREATE"
export const CREATE_MOLD_SUCCESS = "molds/CREATE_SUCCESS"
export const CREATE_MOLD_FAILURE = "molds/CREATE_FAIL"
export const TOGGLE_CREATE_MODAL = "molds/TOGGLE_CREATE_MODAL"

export const getMolds = () => ({
  type: MOLDS_REQUEST,
  payload: getPayload({
    url: "api/v2/discs/molds?size=1000&sort=manufacturer.name,asc&sort=name,asc",
  }),
  manufacturerId: null,
})

export const getMoldsByManufacturer = manufacturerId => ({
  type: MOLDS_REQUEST,
  payload: getPayload({
    url: `api/v2/discs/molds?size=1000&sort=name,asc&manufacturerId=${manufacturerId}`,
  }),
  manufacturerId,
})

export const createMold = mold => ({
  type: CREATE_MOLD_REQUEST,
  payload: postPayload({ url: "api/v2/discs/molds", data: mold }),
})

export const toggleCreateModal = () => ({
  type: TOGGLE_CREATE_MODAL,
})
