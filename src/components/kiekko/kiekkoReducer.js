import { filter, allPass, keys, prop, propEq, uniq, append, without, findIndex, update, path, remove, prepend } from "ramda"

import {
  KIEKOT_SUCCESS,
  TOGGLE_KIEKKO_EDIT_MODAL,
  CHOOSE_IMAGE_SUCCESS,
  UPDATE_IMAGE_DIMENSIONS,
  APPLY_PREDICATES,
  FILTER_KIEKOT,
  KIEKKO_SUCCESS,
  KIEKOT_REQUEST,
  KIEKKO_REQUEST,
  KIEKKO_FAILURE,
  UPDATE_CROP,
  CROP_COMPLETE,
  JULKISET_SUCCESS,
  JULKISET_LAAJENNA,
  JULKISET_REQUEST,
  JULKISET_SUPISTA,
  LOST_REQUEST,
  LOST_SUCCESS,
  UPDATE_KIEKKO_SUCCESS,
  UPLOAD_IMAGE_API,
  UPLOAD_IMAGE_API_SUCCESS,
  UPLOAD_IMAGE_API_FAILURE,
  UPDATE_IMAGE_API,
  UPDATE_IMAGE_API_FAILURE,
  UPDATE_IMAGE_API_SUCCESS,
  FOUND_SUCCESS,
  DELETE_DISC_SUCCESS
} from "./kiekkoActions"
import { defaultSort } from "../shared/text"
import { getSortColumn, removeFromArrayById } from "../shared/utils"

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
  lostSortColumn: null,
  imageUploading: false
}

const updateKiekotArray = (kiekot, updatedKiekko) => {
  const index = findIndex(propEq("id", prop("id", updatedKiekko)))(kiekot)
  return update(index, updatedKiekko, kiekot)
}

const applyFilters = (predicates, kiekot) => {
  return predicates === null
    ? kiekot
    : filter(allPass(predicates), kiekot)
}

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
        kiekot: action.payload.data.content,
        kiekotFiltered: applyFilters(state.predicates, action.payload.data.content),
        sortColumn: getSortColumn(action),
        isEditOpen: false,
        kiekkoInEdit: null,
        image: null,
        crop: {},
        croppedImage: null,
        kiekko: null
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
        kiekko: action.payload.data,
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
    case UPDATE_KIEKKO_SUCCESS: {
      const kiekotUpdated = updateKiekotArray(state.kiekot, action.payload.data)
      return {
        ...state,
        isEditOpen: false,
        kiekot: kiekotUpdated,
        kiekotFiltered: applyFilters(state.predicates, kiekotUpdated)
      }
    }
    case CHOOSE_IMAGE_SUCCESS:
      return {
        ...state,
        image: action.base64,
        crop: {},
        pixelCrop: {
          width: "",
          height: ""
        }
      }
    case UPDATE_IMAGE_DIMENSIONS:
      return {
        ...state,
        imageDimensions: action.imageDimensions
      }
    case UPLOAD_IMAGE_API:
    case UPDATE_IMAGE_API:
      return {
        ...state,
        imageUploading: true
      }
    case UPLOAD_IMAGE_API_SUCCESS: {
      const kiekotUpdated = prepend(action.payload.data, state.kiekot)
      return {
        ...state,
        kiekkoInEdit: action.payload.data,
        kiekot: kiekotUpdated,
        kiekotFiltered: applyFilters(state.predicates, kiekotUpdated),
        isEditOpen: true,
        image: null,
        imageUploading: false
      }
    }
    case UPDATE_IMAGE_API_SUCCESS: {
      return {
        ...state,
        image: null,
        imageUploading: false
      }
    }
    case UPLOAD_IMAGE_API_FAILURE:
    case UPDATE_IMAGE_API_FAILURE:
      return {
        ...state,
        imageUploading: false
      }
    case APPLY_PREDICATES: {
      const predicates = keys(filter(n => n, action.form)).map(p => d => prop(p, d))
      return {
        ...state,
        predicates: predicates,
        kiekotFiltered: applyFilters(predicates, state.kiekot)
      }
    }
    case UPDATE_CROP:
      return {
        ...state,
        crop: action.crop,
        pixelCrop: action.pixelCrop
      }
    case CROP_COMPLETE:
      return {
        ...state,
        croppedImage: action.image,
      }
    case JULKISET_REQUEST:
      return {
        ...state,
        julkiset: null
      }
    case JULKISET_SUCCESS:
      return {
        ...state,
        julkiset: action.payload.data,
        sortColumn: getSortColumn(action)
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
        lost: action.payload.data.content,
        lostSortColumn: getSortColumn(action)
      }
    case FOUND_SUCCESS:
      return {
        ...state,
        lost: removeFromArrayById(state.lost, path(["meta", "previousAction", "id"], action))
      }
    case DELETE_DISC_SUCCESS: {
      const kiekotUpdated = removeFromArrayById(state.kiekot, path(["meta", "previousAction", "id"], action))
      return {
        ...state,
        kiekot: kiekotUpdated,
        kiekotFiltered: applyFilters(state.predicates, kiekotUpdated)
      }
    }
    default:
      return state
  }
}

export default kiekkoReducer
