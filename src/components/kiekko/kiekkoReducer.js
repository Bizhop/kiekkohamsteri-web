import { filter, allPass, keys, prop, uniq, append, without } from "ramda"

import {
  KIEKOT_SUCCESS,
  TOGGLE_KIEKKO_EDIT_MODAL,
  CHOOSE_IMAGE,
  UPDATE_IMAGE_DIMENSIONS,
  UPLOAD_SUCCESS,
  APPLY_PREDICATES,
  FILTER_KIEKOT,
  KIEKKO_SUCCESS,
  KIEKOT_REQUEST,
  KIEKKO_REQUEST,
  KIEKKO_FAILURE,
  UPDATE_CROP,
  COMPLETE_CROP,
  JULKISET_SUCCESS,
  JULKISET_LAAJENNA,
  JULKISET_REQUEST,
  JULKISET_SUPISTA,
  LOST_REQUEST,
  LOST_SUCCESS
} from "./kiekkoActions"
import { defaultSort } from "../shared/text"

const initialState = {
  kiekot: [],
  kiekko: null,
  kiekotFiltered: null,
  isEditOpen: false,
  kiekkoInEdit: null,
  image: null,
  imageDimensions: " x ",
  sortColumn: defaultSort.newSortColumn,
  predicates: null,
  oneDiscText: "",
  crop: {},
  croppedImage: null,
  pixelCrop: {
    width: "",
    height: ""
  },
  julkiset: null,
  julkisetVisible: [],
  lost: null,
  lostSortColumn: null
}

const processCrop = (pixelCrop, base64) => {
  const canvas = document.createElement("canvas")
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext("2d")

  var image = new Image()
  image.src = base64

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return canvas.toDataURL("image/jpeg")
}

const getImageDimensions = base64 =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = base64
  })

const kiekkoReducer = (state = initialState, action) => {
  switch (action.type) {
    case KIEKOT_REQUEST:
      return {
        ...state,
        kiekot: [],
        kiekotFiltered: null
      }
    case KIEKOT_SUCCESS:
      return {
        ...state,
        kiekot: action.params.kiekot,
        kiekotFiltered:
          state.predicates === null
            ? action.params.kiekot
            : filter(allPass(state.predicates), action.params.kiekot),
        sortColumn: action.params.newSortColumn,
        isEditOpen: false,
        kiekkoInEdit: null,
        image: null,
        crop: {},
        croppedImage: null
      }
    case KIEKKO_REQUEST:
      return {
        ...state,
        kiekko: null,
        oneDiscText: "Haetaan..."
      }
    case KIEKKO_SUCCESS:
      return {
        ...state,
        kiekko: action.kiekko,
        oneDiscText: ""
      }
    case KIEKKO_FAILURE:
      return {
        ...state,
        kiekko: null,
        oneDiscText: "Ei saatavilla"
      }
    case TOGGLE_KIEKKO_EDIT_MODAL:
      return {
        ...state,
        isEditOpen: !state.isEditOpen,
        kiekkoInEdit: action.kiekko
      }
    case CHOOSE_IMAGE:
      return {
        ...state,
        image: action.image
      }
    case UPDATE_IMAGE_DIMENSIONS:
      return {
        ...state,
        imageDimensions: action.imageDimensions
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        kiekkoInEdit: action.response,
        isEditOpen: true,
        image: null
      }
    case APPLY_PREDICATES:
      return {
        ...state,
        predicates: keys(filter(n => n, action.form)).map(p => d => prop(p, d))
      }
    case FILTER_KIEKOT:
      return {
        ...state,
        kiekotFiltered: filter(allPass(state.predicates), state.kiekot)
      }
    case UPDATE_CROP:
      return {
        ...state,
        crop: action.crop,
        pixelCrop: action.pixelCrop
      }
    case COMPLETE_CROP:
      return {
        ...state,
        croppedImage: processCrop(action.pixelCrop, state.image.base64),
        pixelCrop: action.pixelCrop
      }
    case JULKISET_REQUEST:
      return {
        ...state,
        julkiset: null
      }
    case JULKISET_SUCCESS:
      return {
        ...state,
        julkiset: action.params.julkiset,
        sortColumn: action.params.newSortColumn
      }
    case JULKISET_LAAJENNA:
      return {
        ...state,
        julkisetVisible: uniq(append(action.username, state.julkisetVisible))
      }
    case JULKISET_SUPISTA:
      return {
        ...state,
        julkisetVisible: without(action.username, state.julkisetVisible)
      }
    case LOST_REQUEST:
      return {
        ...state,
        lost: null
      }
    case LOST_SUCCESS:
      return {
        ...state,
        lost: action.params.lost,
        lostSortColumn: action.params.newSortColumn
      }
    default:
      return state
  }
}

export default kiekkoReducer
