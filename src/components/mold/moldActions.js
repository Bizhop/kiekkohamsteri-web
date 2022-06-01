export const MOLDS_REQUEST = 'MOLDS_REQUEST'
export const MOLDS_SUCCESS = 'MOLDS_SUCCESS'
export const MOLDS_FAILURE = 'MOLDS_FAILURE'
export const MOLDS_BY_VALMISTAJA_REQUEST = 'MOLDS_BY_VALMISTAJA_REQUEST'
export const CREATE_MOLD_REQUEST = 'CREATE_MOLD_REQUEST'
export const CREATE_MOLD_FAILURE = 'CREATE_MOLD_FAILURE'
export const TOGGLE_CREATE_MODAL = 'TOGGLE_CREATE_MODAL'

export const getMolds = () => ({
  type: MOLDS_REQUEST,
})

export const getMoldsByValmistaja = valmId => ({
  type: MOLDS_BY_VALMISTAJA_REQUEST,
  valmId,
})

export const moldsSuccess = molds => ({
  type: MOLDS_SUCCESS,
  molds,
})

export const moldsFailure = error => ({
  type: MOLDS_FAILURE,
  error,
})

export const createMold = mold => ({
  type: CREATE_MOLD_REQUEST,
  mold,
})

export const createMoldFailure = error => ({
  type: CREATE_MOLD_FAILURE,
  error,
})

export const toggleCreateModal = () => ({
  type: TOGGLE_CREATE_MODAL,
})
