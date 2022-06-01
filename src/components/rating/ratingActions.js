export const INIT_RATING = "INIT_RATING"
export const RATING_REQUEST = "RATING_REQUEST"
export const RATING_SUCCESS = "RATING_SUCCESS"
export const RATING_FAILURE = "RATING_FAILURE"
export const CUSTOM_RATING_REQUEST = "CUSTOM_RATING_REQUEST"
export const CUSTOM_RATING_SUCCESS = "CUSTOM_RATING_SUCCESS"
export const CUSTOM_RATING_FAILURE = "CUSTOM_RATING_FAILURE"

export const initRating = () => ({
  type: INIT_RATING
})

export const getRating = pdga => ({
  type: RATING_REQUEST,
  pdga
})

export const ratingSuccess = response => ({
  type: RATING_SUCCESS,
  response
})

export const ratingError = error => ({
  type: RATING_FAILURE,
  error
})

export const getCustomRating = form => ({
  type: CUSTOM_RATING_REQUEST,
  form
})

export const customRatingSuccess = response => ({
  type: CUSTOM_RATING_SUCCESS,
  response
})

export const customRatingFailure = error => ({
  type: CUSTOM_RATING_FAILURE,
  error
})
