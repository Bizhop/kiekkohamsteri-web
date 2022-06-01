export const MUOVIT_REQUEST = 'MUOVIT_REQUEST'
export const MUOVIT_SUCCESS = 'MUOVIT_SUCCESS'
export const MUOVIT_FAILURE = 'MUOVIT_FAILURE'
export const MUOVIT_BY_VALMISTAJA_REQUEST = 'MUOVIT_BY_VALMISTAJA_REQUEST'
export const TOGGLE_CREATE_MODAL = 'TOGGLE_CREATE_MODAL'
export const CREATE_MUOVI_REQUEST = 'CREATE_MUOVI_REQUEST'
export const CREATE_MUOVI_FAILURE = 'CREATE_MUOVI_FAILURE'

export const getMuovit = () => ({
  type: MUOVIT_REQUEST,
})

export const getMuovitByValmistaja = valmId => ({
  type: MUOVIT_BY_VALMISTAJA_REQUEST,
  valmId,
})

export const muovitSuccess = muovit => ({
  type: MUOVIT_SUCCESS,
  muovit,
})

export const muovitFailure = error => ({
  type: MUOVIT_FAILURE,
  error,
})

export const createMuovi = muovi => ({
  type: CREATE_MUOVI_REQUEST,
  muovi,
})

export const createMuoviFailure = error => ({
  type: CREATE_MUOVI_FAILURE,
  error,
})

export const toggleCreateModal = () => ({
  type: TOGGLE_CREATE_MODAL,
})
