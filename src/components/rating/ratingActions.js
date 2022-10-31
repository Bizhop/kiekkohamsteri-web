import { getPayload, postPayload } from "../Api"

export const INIT_RATING = "rating/INIT"
export const RATING_REQUEST = "rating/GET"
export const RATING_SUCCESS = "rating/GET_SUCCESS"
export const RATING_FAILURE = "rating/GET_FAIL"
export const CUSTOM_RATING_REQUEST = "rating/CUSTOM"
export const CUSTOM_RATING_SUCCESS = "rating/CUSTOM_SUCCESS"
export const CUSTOM_RATING_FAILURE = "rating/CUSTOM_FAIL"

export const initRating = () => ({
  type: INIT_RATING,
})

export const getRating = pdga => ({
  type: RATING_REQUEST,
  payload: getPayload({ url: `api/rating/${pdga}` }),
})

export const getCustomRating = form => ({
  type: CUSTOM_RATING_REQUEST,
  payload: postPayload({
    url: `api/rating${form.byRoundsOnly ? "?byRoundsOnly=true" : ""}`,
    data: form.rounds,
  }),
})
