export const OMAT_OSTOT_REQUEST = "OMAT_OSTOT_REQUEST"
export const OMAT_OSTOT_SUCCESS = "OMAT_OSTOT_SUCCESS"
export const OMAT_OSTOT_FAILURE = "OMAT_OSTOT_FAILURE"
export const BUY_DISC_REQUEST = "BUY_DISC_REQUEST"
export const BUY_DISC_SUCCESS = "BUY_DISC_SUCCESS"
export const BUY_DISC_FAILURE = "BUY_DISC_FAILURE"
export const PERUUTA_OSTO_REQUEST = "PERUUTA_OSTO_REQUEST"
export const PERUUTA_OSTO_FAILURE = "PERUUTA_OSTO_FAILURE"
export const HYVAKSY_OSTO_REQUEST = "HYVAKSY_OSTO_REQUEST"
export const HYVAKSY_OSTO_FAILURE = "HYVAKSY_OSTO_FAILURE"

export const getOmat = () => ({
  type: OMAT_OSTOT_REQUEST
})

export const omatSuccess = data => ({
  type: OMAT_OSTOT_SUCCESS,
  data
})

export const omatFailure = error => ({
  type: OMAT_OSTOT_FAILURE,
  error
})

export const buyDisc = id => ({
  type: BUY_DISC_REQUEST,
  id
})

export const buyDiscSuccess = () => ({
  type: BUY_DISC_SUCCESS
})

export const buyDiscFailure = error => ({
  type: BUY_DISC_FAILURE,
  error
})

export const peruutaOsto = id => ({
  type: PERUUTA_OSTO_REQUEST,
  id
})

export const peruutaOstoFailure = id => ({
  type: PERUUTA_OSTO_FAILURE,
  id
})

export const hyvaksyOsto = id => ({
  type: HYVAKSY_OSTO_REQUEST,
  id
})

export const hyvaksyOstoFailure = error => ({
  type: HYVAKSY_OSTO_FAILURE,
  error
})
