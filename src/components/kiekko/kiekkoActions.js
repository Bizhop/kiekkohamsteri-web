export const KIEKOT_REQUEST = "KIEKOT_REQUEST"
export const KIEKOT_SUCCESS = "KIEKOT_SUCCESS"
export const KIEKOT_FAILURE = "KIEKOT_FAILURE"
export const KIEKKO_REQUEST = "KIEKKO_REQUEST"
export const KIEKKO_SUCCESS = "KIEKKO_SUCCESS"
export const KIEKKO_FAILURE = "KIEKKO_FAILURE"
export const TOGGLE_KIEKKO_EDIT_MODAL = "TOGGLE_KIEKKO_EDIT_MODAL"
export const UPDATE_KIEKKO_REQUEST = "UPDATE_KIEKKO_REQUEST"
export const UPDATE_KIEKKO_FAILURE = "UPDATE_KIEKKO_FAILURE"
export const CHOOSE_IMAGE = "CHOOSE_IMAGE"
export const UPDATE_IMAGE_DIMENSIONS = "UPDATE_IMAGE_DIMENSIONS"
export const UPLOAD_IMAGE = "UPLOAD_IMAGE"
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS"
export const UPLOAD_FAILURE = "UPLOAD_FAILURE"
export const DELETE_DISC = "DELETE_DISC"
export const DELETE_DISC_FAILURE = "DELETE_DISC_FAILURE"
export const APPLY_PREDICATES = "APPLY_PREDICATES"
export const FILTER_KIEKOT = "FILTER_KIEKOT"
export const UPDATE_CROP = "UPDATE_CROP"
export const COMPLETE_CROP = "COMPLETE_CROP"
export const UPDATE_IMAGE = "UPDATE_IMAGE"
export const UPDATE_IMAGE_FAILURE = "UPDATE_IMAGE_FAILURE"
export const RESIZE_COMPLETE = "RESIZE_COMPLETE"
export const JULKISET_REQUEST = "JULKISET_REQUEST"
export const JULKISET_SUCCESS = "JULKISET_SUCCESS"
export const JULKISET_FAILURE = "JULKISET_FAILURE"
export const JULKISET_LAAJENNA = "JULKISET_LAAJENNA"
export const JULKISET_SUPISTA = "JULKISET_SUPISTA"
export const LOST_REQUEST = "LOST_REQUEST"
export const LOST_SUCCESS = "LOST_SUCCESS"
export const LOST_FAILURE = "LOST_FAILURE"
export const FOUND_REQUEST = "FOUND_REQUEST"

export const getKiekot = params => ({
  type: KIEKOT_REQUEST,
  params
})

export const kiekotSuccess = params => ({
  type: KIEKOT_SUCCESS,
  params
})

export const kiekotError = error => ({
  type: KIEKOT_FAILURE,
  error
})

export const getKiekko = id => ({
  type: KIEKKO_REQUEST,
  id
})

export const kiekkoSuccess = kiekko => ({
  type: KIEKKO_SUCCESS,
  kiekko
})

export const kiekkoError = error => ({
  type: KIEKKO_FAILURE,
  error
})

export const updateDisc = kiekko => ({
  type: UPDATE_KIEKKO_REQUEST,
  kiekko
})

export const updateKiekkoFailure = error => ({
  type: UPDATE_KIEKKO_FAILURE,
  error
})

export const toggleEditModal = kiekko => ({
  type: TOGGLE_KIEKKO_EDIT_MODAL,
  kiekko
})

export const chooseImage = image => ({
  type: CHOOSE_IMAGE,
  image
})

export const updateImageDimensions = imageDimensions => ({
  type: UPDATE_IMAGE_DIMENSIONS,
  imageDimensions
})

export const uploadImage = data => ({
  type: UPLOAD_IMAGE,
  data
})

export const uploadSuccess = response => ({
  type: UPLOAD_SUCCESS,
  response
})

export const uploadFailure = error => ({
  type: UPLOAD_FAILURE,
  error
})

export const deleteDisc = id => ({
  type: DELETE_DISC,
  id
})

export const deleteDiscFailure = error => ({
  type: DELETE_DISC_FAILURE,
  error
})

export const applyPredicates = form => ({
  type: APPLY_PREDICATES,
  form
})

export const filterKiekot = () => ({
  type: FILTER_KIEKOT
})

export const updateCrop = crop => ({
  type: UPDATE_CROP,
  crop
})

export const completeCrop = (crop, pixelCrop) => ({
  type: COMPLETE_CROP,
  crop,
  pixelCrop
})

export const updateImage = params => ({
  type: UPDATE_IMAGE,
  params
})

export const updateImageFailure = error => ({
  type: UPDATE_IMAGE_FAILURE,
  error
})

export const resizeComplete = image => ({
  type: RESIZE_COMPLETE,
  image
})

export const getJulkiset = params => ({
  type: JULKISET_REQUEST,
  params
})

export const julkisetSuccess = params => ({
  type: JULKISET_SUCCESS,
  params
})

export const julkisetFailure = error => ({
  type: JULKISET_FAILURE,
  error
})

export const laajenna = username => ({
  type: JULKISET_LAAJENNA,
  username
})

export const supista = username => ({
  type: JULKISET_SUPISTA,
  username
})

export const getLost = params => ({
  type: LOST_REQUEST,
  params
})

export const lostSuccess = params => ({
  type: LOST_SUCCESS,
  params
})

export const lostFailure = error => ({
  type: LOST_FAILURE,
  error
})

export const found = id => ({
  type: FOUND_REQUEST,
  id
})
