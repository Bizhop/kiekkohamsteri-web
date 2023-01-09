import { getPayload, postPayload } from "../Api"

export const PLASTICS_REQUEST = "plastics/GET"
export const PLASTICS_SUCCESS = "plastics/GET_SUCCESS"
export const PLASTICS_FAILURE = "plastics/GET_FAIL"
export const TOGGLE_CREATE_MODAL = "plastics/TOGGLE_CREATE_MODAL"
export const CREATE_PLASTIC_REQUEST = "plastics/CREATE"
export const CREATE_PLASTIC_SUCCESS = "plastics/CREATE_SUCCESS"
export const CREATE_PLASTIC_FAILURE = "plastics/CREATE_FAIL"

export const getPlastics = () => ({
  type: PLASTICS_REQUEST,
  payload: getPayload({ url: "api/v2/discs/plastics?size=1000&sort=name,asc" }),
  manufacturerId: null,
})

export const getPlasticsByManufacturer = manufacturerId => ({
  type: PLASTICS_REQUEST,
  payload: getPayload({
    url: `api/v2/discs/plastics?size=1000&sort=name,asc&manufacturerId=${manufacturerId}`,
  }),
  manufacturerId,
})

export const createPlastic = plastic => ({
  type: CREATE_PLASTIC_REQUEST,
  payload: postPayload({ url: "api/v2/discs/plastics", data: plastic }),
})

export const toggleCreateModal = () => ({
  type: TOGGLE_CREATE_MODAL,
})
