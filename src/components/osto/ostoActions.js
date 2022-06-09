import { getPayload, postPayload } from "../Api"

export const OMAT_OSTOT_REQUEST = "ostot/OMAT"
export const OMAT_OSTOT_SUCCESS = "ostot/OMAT_SUCCESS"
export const OMAT_OSTOT_FAILURE = "ostot/OMAT_FAIL"
export const OSTA_REQUEST = "ostot/OSTA"
export const OSTA_SUCCESS = "ostot/OSTA_SUCCESS"
export const OSTA_FAILURE = "ostot/OSTA_FAIL"
export const PERUUTA_OSTO_REQUEST = "ostot/PERUUTA"
export const PERUUTA_OSTO_SUCCESS = "ostot/PERUUTA_SUCCESS"
export const PERUUTA_OSTO_FAILURE = "ostot/PERUUTA_FAIL"
export const HYVAKSY_OSTO_REQUEST = "ostot/HYVAKSY"
export const HYVAKSY_OSTO_SUCCESS = "ostot/HYVAKSY_SUCCESS"
export const HYVAKSY_OSTO_FAILURE = "ostot/HYVAKSY_FAIL"

export const getOmat = () => ({
  type: OMAT_OSTOT_REQUEST,
  payload: getPayload({url: "api/ostot/omat"})
})

export const buyDisc = id => ({
  type: OSTA_REQUEST,
  payload: postPayload({url: `api/kiekot/${id}/buy`}),
  id
})

export const peruutaOsto = id => ({
  type: PERUUTA_OSTO_REQUEST,
  payload: postPayload({url: `api/ostot/${id}/reject`}),
  id
})

export const hyvaksyOsto = id => ({
  type: HYVAKSY_OSTO_REQUEST,
  payload: postPayload({url: `api/ostot/${id}/confirm`}),
  id
})

//`api/ostot/${action.id}/confirm`
