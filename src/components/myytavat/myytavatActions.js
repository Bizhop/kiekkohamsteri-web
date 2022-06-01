export const MYYTAVAT_REQUEST = "MYYTAVAT_REQUEST"
export const MYYTAVAT_SUCCESS = "MYYTAVAT_SUCCESS"
export const MYYTAVAT_FAILURE = "MYYTAVAT_FAILURE"

export const getMyytavat = params => ({
  type: MYYTAVAT_REQUEST,
  params
})

export const myytavatSuccess = params => ({
  type: MYYTAVAT_SUCCESS,
  params
})

export const myytavatError = error => ({
  type: MYYTAVAT_FAILURE,
  error
})
