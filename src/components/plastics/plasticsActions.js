import { getPayload, postPayload } from "../Api"

export const MUOVIT_REQUEST = "plastics/GET"
export const MUOVIT_SUCCESS = "plastics/GET_SUCCESS"
export const MUOVIT_FAILURE = "plastics/GET_FAIL"
export const TOGGLE_CREATE_MODAL = "plastics/TOGGLE_CREATE_MODAL"
export const CREATE_MUOVI_REQUEST = "plastics/CREATE"
export const CREATE_MUOVI_SUCCESS = "plastics/CREATE_SUCCESS"
export const CREATE_MUOVI_FAILURE = "plastics/CREATE_FAIL"

export const getPlastics = () => ({
  type: MUOVIT_REQUEST,
  payload: getPayload({ url: "api/v2/discs/plastics?size=1000&sort=name,asc" }),
  valmId: null,
})

export const getPlasticsByManufacturer = manufacturerId => ({
  type: MUOVIT_REQUEST,
  payload: getPayload({ url: `api/v2/discs/plastics?size=1000&sort=name,asc&manufacturerId=${manufacturerId}` }),
  manufacturerId
})

export const createPlastic = plastic => ({
  type: CREATE_MUOVI_REQUEST,
  payload: postPayload({ url: "api/v2/discs/plastics", data: plastic }),
})

export const toggleCreateModal = () => ({
  type: TOGGLE_CREATE_MODAL,
})
