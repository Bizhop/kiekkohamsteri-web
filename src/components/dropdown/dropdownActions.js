import { getPayload } from "../Api"

export const DROPDOWNS_REQUEST = "dropdowns/GET"
export const DROPDOWNS_SUCCESS = "dropdowns/GET_SUCCESS"
export const DROPDOWNS_FAILURE = "dropdowns/GET_FAIL"

export const getDropdowns = () => ({
  type: DROPDOWNS_REQUEST,
  payload: getPayload({url: "api/dropdown"})
})

export const getDropdownsByValmistaja = valmId => ({
  type: DROPDOWNS_REQUEST,
  payload: getPayload({url: `api/dropdown?valmId=${valmId}`})
})
