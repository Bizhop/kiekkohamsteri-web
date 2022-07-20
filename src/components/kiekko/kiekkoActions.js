import { getPayload, putPayload, postPayload, patchPayload, deletePayload } from "../Api"
import { pick } from "ramda"

export const KIEKOT_REQUEST = "kiekot/GET"
export const KIEKOT_SUCCESS = "kiekot/GET_SUCCESS"
export const KIEKOT_FAILURE = "kiekot/GET_FAIL"
export const KIEKKO_REQUEST = "kiekot/GET_ONE"
export const KIEKKO_SUCCESS = "kiekot/GET_ONE_SUCCESS"
export const KIEKKO_FAILURE = "kiekot/GET_ONE_FAIL"
export const TOGGLE_KIEKKO_EDIT_MODAL = "kiekot/TOGGLE_EDIT_MODAL"
export const UPDATE_KIEKKO_REQUEST = "kiekot/UPDATE"
export const UPDATE_KIEKKO_SUCCESS = "kiekot/UPDATE_SUCCESS"
export const UPDATE_KIEKKO_FAILURE = "kiekot/UPDATE_FAIL"
export const CHOOSE_IMAGE = "kiekot/CHOOSE_IMAGE"
export const CHOOSE_IMAGE_SUCCESS = "kiekot/CHOOSE_IMAGE_SUCCESS"
export const UPDATE_IMAGE_DIMENSIONS = "kiekot/UPDATE_IMAGE_DIMENSIONS"
export const UPLOAD_IMAGE = "kiekot/UPLOAD_IMAGE"
export const UPLOAD_IMAGE_API = "kiekot/UPLOAD_IMAGE_API"
export const UPLOAD_IMAGE_API_SUCCESS = "kiekot/UPLOAD_IMAGE_API_SUCCESS"
export const UPLOAD_IMAGE_API_FAILURE = "kiekot/UPLOAD_IMAGE_API_FAIL"
export const DELETE_DISC = "kiekot/DELETE"
export const DELETE_DISC_SUCCESS = "kiekot/DELETE_SUCCESS"
export const DELETE_DISC_FAILURE = "kiekot/DELETE_FAIL"
export const APPLY_PREDICATES = "kiekot/APPLY_PREDICATES"
export const UPDATE_CROP = "kiekot/UPDATE_CROP"
export const COMPLETE_CROP = "kiekot/COMPLETE_CROP"
export const CROP_COMPLETE = "kiekot/CROP_COMPLETE"
export const UPDATE_IMAGE = "kiekot/UPDATE_IMAGE"
export const UPDATE_IMAGE_API = "kiekot/UPDATE_IMAGE_API"
export const UPDATE_IMAGE_API_SUCCESS = "kiekot/UPDATE_IMAGE_API_SUCCESS"
export const UPDATE_IMAGE_API_FAILURE = "kiekot/UPDATE_IMAGE_API_FAILURE"
export const JULKISET_REQUEST = "kiekot/GET_JULKISET"
export const JULKISET_SUCCESS = "kiekot/GET_JULKISET_SUCCESS"
export const JULKISET_FAILURE = "kiekot/GET_JULKISET_FAIL"
export const JULKISET_LAAJENNA = "kiekot/JULKISET_LAAJENNA"
export const JULKISET_SUPISTA = "kiekot/JULKISET_SUPISTA"
export const LOST_REQUEST = "kiekot/GET_LOST"
export const LOST_SUCCESS = "kiekot/GET_LOST_SUCCESS"
export const LOST_FAILURE = "kiekot/GET_LOST_FAIL"
export const FOUND_REQUEST = "kiekot/FOUND"
export const FOUND_SUCCESS = "kiekot/FOUND_SUCCESS"
export const FOUND_FAILURE = "kiekot/FOUND_FAIL"

const updateFields = [
  "valmId",
  "moldId",
  "muoviId",
  "variId",
  "kunto",
  "tussit",
  "paino",
  "muuta",
  "dyed",
  "hohto",
  "itb",
  "loytokiekko",
  "myynnissa",
  "spessu",
  "swirly",
  "hinta",
  "publicDisc",
  "lost"
]

export const getKiekot = params => ({
  type: KIEKOT_REQUEST,
  params,
  payload: getPayload({url: `api/kiekot?size=1000&sort=${params.sort}`})
})

export const getKiekko = id => ({
  type: KIEKKO_REQUEST,
  payload: getPayload({url: `api/kiekot/${id}`})
})

export const updateDisc = kiekko => ({
  type: UPDATE_KIEKKO_REQUEST,
  payload: putPayload({url: `api/kiekot/${kiekko.id}`, data: pick(updateFields, kiekko)})
})

export const toggleEditModal = kiekko => ({
  type: TOGGLE_KIEKKO_EDIT_MODAL,
  kiekko
})

export const chooseImage = acceptedFiles => ({
  type: CHOOSE_IMAGE,
  acceptedFiles
})

export const chooseImageSuccess = base64 => ({
  type: CHOOSE_IMAGE_SUCCESS,
  base64
})

export const updateImageDimensions = imageDimensions => ({
  type: UPDATE_IMAGE_DIMENSIONS,
  imageDimensions
})

export const uploadImage = data => ({
  type: UPLOAD_IMAGE,
  data
})

export const uploadImageApi = data => ({
  type: UPLOAD_IMAGE_API,
  payload: postPayload({url: "api/kiekot", data: data})
})

export const updateImage = params => ({
  type: UPDATE_IMAGE,
  params
})

export const updateImageApi = params => ({
  type: UPDATE_IMAGE_API,
  payload: patchPayload({url: `api/kiekot/${params.id}/update-image`, data: params.data})
})

export const deleteDisc = id => ({
  type: DELETE_DISC,
  payload: deletePayload({url: `api/kiekot/${id}`}),
  id
})

export const applyPredicates = form => ({
  type: APPLY_PREDICATES,
  form
})

export const updateCrop = crop => ({
  type: UPDATE_CROP,
  crop
})

export const completeCrop = params => ({
  type: COMPLETE_CROP,
  ...params
})

export const cropComplete = image => ({
  type: CROP_COMPLETE,
  image
})

export const getJulkiset = () => ({
  type: JULKISET_REQUEST,
  payload: getPayload({url: 'api/kiekot/public-lists'})
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
  payload: getPayload({url: `api/kiekot/lost?size=1000&sort=${params.sort}`}),
  params
})

export const found = id => ({
  type: FOUND_REQUEST,
  payload: patchPayload({url: `api/kiekot/${id}/found`}),
  id
})
