export const DROPDOWNS_REQUEST = 'DROPDOWNS_REQUEST'
export const DROPDOWNS_BY_VALMISTAJA_REQUEST = 'DROPDOWNS_BY_VALMISTAJA_REQUEST'
export const DROPDOWNS_SUCCESS = 'DROPDOWNS_SUCCESS'
export const DROPDOWNS_FAILURE = 'DROPDOWNS_FAILURE'

export const getDropdowns = () => ({
  type: DROPDOWNS_REQUEST,
})

export const getDropdownsByValmistaja = valmId => ({
  type: DROPDOWNS_BY_VALMISTAJA_REQUEST,
  valmId,
})

export const dropdownsSuccess = dropdowns => ({
  type: DROPDOWNS_SUCCESS,
  dropdowns,
})

export const dropdownsFailure = error => ({
  type: DROPDOWNS_FAILURE,
  error,
})
