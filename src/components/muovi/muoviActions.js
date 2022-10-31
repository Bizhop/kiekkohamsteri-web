import { getPayload, postPayload } from "../Api"

export const MUOVIT_REQUEST = "muovit/GET"
export const MUOVIT_SUCCESS = "muovit/GET_SUCCESS"
export const MUOVIT_FAILURE = "muovit/GET_FAIL"
export const TOGGLE_CREATE_MODAL = "muovit/TOGGLE_CREATE_MODAL"
export const CREATE_MUOVI_REQUEST = "muovit/CREATE"
export const CREATE_MUOVI_SUCCESS = "muovit/CREATE_SUCCESS"
export const CREATE_MUOVI_FAILURE = "muovit/CREATE_FAIL"

export const getMuovit = () => ({
  type: MUOVIT_REQUEST,
  payload: getPayload({ url: "api/muovit?size=1000&sort=muovi,asc" }),
  valmId: null,
})

export const getMuovitByValmistaja = valmId => ({
  type: MUOVIT_REQUEST,
  payload: getPayload({ url: `api/muovit?size=1000&sort=muovi,asc&valmId=${valmId}` }),
  valmId: valmId,
})

export const createMuovi = muovi => ({
  type: CREATE_MUOVI_REQUEST,
  payload: postPayload({ url: "api/muovit", data: muovi }),
})

export const toggleCreateModal = () => ({
  type: TOGGLE_CREATE_MODAL,
})
