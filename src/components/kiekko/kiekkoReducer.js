import { prop, propEq, findIndex, update, path, prepend, length, head, pick, pathOr } from "ramda"
import { toast } from "react-toastify"

import {
  DISCS_REQUEST,
  DISCS_SUCCESS,
  DISCS_FAILURE,
  TOGGLE_DISC_EDIT_MODAL,
  CHOOSE_IMAGE_SUCCESS,
  CANCEL_IMAGE_SELECTION,
  UPDATE_IMAGE_DIMENSIONS,
  DISC_SUCCESS,
  DISC_REQUEST,
  DISC_FAILURE,
  SEARCH_DISCS_REQUEST,
  SEARCH_DISCS_SUCCESS,
  SEARCH_DISCS_FAILURE,
  UPDATE_CROP,
  CROP_COMPLETE,
  LOST_REQUEST,
  LOST_SUCCESS,
  UPDATE_DISC_SUCCESS,
  UPLOAD_IMAGE_API,
  UPLOAD_IMAGE_API_SUCCESS,
  UPLOAD_IMAGE_API_FAILURE,
  UPDATE_IMAGE_API,
  UPDATE_IMAGE_API_FAILURE,
  UPDATE_IMAGE_API_SUCCESS,
  FOUND_SUCCESS,
  DELETE_DISC_SUCCESS,
  OTHER_USER_DISCS,
  OTHER_USER_DISCS_SUCCESS,
  SEARCH_DISCS_OPERATIONS_REQUEST,
  SEARCH_DISCS_OPERATIONS_SUCCESS,
  SEARCH_DISCS_OPERATIONS_FAILURE,
} from "./kiekkoActions"
import { DROPDOWNS_SUCCESS } from "../dropdown/dropdownActions"
import { removeFromArrayById } from "../shared/utils"
import { defaultSort, defaultPagination } from "../shared/constants"

const initialState = {
  kiekot: [],
  kiekko: null,
  isEditOpen: false,
  kiekkoInEdit: null,
  image: null,
  imageDimensions: " x ",
  oneDiscText: "",
  crop: {},
  croppedImage: null,
  pixelCrop: {
    width: "",
    height: "",
  },
  lost: null,
  lostSort: null,
  lostPagination: null,
  imageUploading: false,
  otherUserDiscs: false,
  otherUserName: "",
  searchOperations: [],
  pagination: defaultPagination,
  sort: defaultSort,
  filters: [],
}

const updateKiekotArray = (kiekot, updatedKiekko) => {
  const index = findIndex(propEq("id", prop("id", updatedKiekko)))(kiekot)
  return update(index, updatedKiekko, kiekot)
}

const kiekkoReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCS_REQUEST:
    case SEARCH_DISCS_REQUEST:
      return {
        ...state,
        kiekot: [],
        otherUserDiscs: false,
        otherUserName: "",
      }
    case OTHER_USER_DISCS:
      return {
        ...state,
        kiekot: [],
        otherUserDiscs: true,
      }
    case DISCS_SUCCESS:
    case OTHER_USER_DISCS_SUCCESS:
    case SEARCH_DISCS_SUCCESS:
      const data = action.payload.data
      const discs = data.content
      return {
        ...state,
        kiekot: discs,
        isEditOpen: false,
        kiekkoInEdit: null,
        image: null,
        crop: {},
        croppedImage: null,
        kiekko: null,
        otherUserName: length(discs) > 0 ? path(["omistaja"], head(discs)) : "",
        pagination: pick(["totalElements", "size", "number"], data),
        sort: path(["meta", "previousAction", "sort"], action),
        filters: pathOr([], ["meta", "previousAction", "filters"], action),
      }
    case DISCS_FAILURE:
    case SEARCH_DISCS_FAILURE:
      toast.error("Kiekkojen haku epäonnistui")
      return {
        ...state,
        kiekot: [],
      }
    case SEARCH_DISCS_OPERATIONS_REQUEST:
    case SEARCH_DISCS_OPERATIONS_FAILURE:
      return {
        ...state,
        searchOperations: [],
      }
    case SEARCH_DISCS_OPERATIONS_SUCCESS:
      return {
        ...state,
        searchOperations: action.payload.data,
      }
    case DISC_REQUEST:
      return {
        ...state,
        kiekko: null,
        oneDiscText: "Haetaan...",
      }
    case DISC_SUCCESS:
      return {
        ...state,
        kiekko: action.payload.data,
        oneDiscText: null,
      }
    case DISC_FAILURE:
      return {
        ...state,
        kiekko: null,
        oneDiscText: "Ei saatavilla",
      }
    case TOGGLE_DISC_EDIT_MODAL:
      return {
        ...state,
        isEditOpen: !state.isEditOpen,
        kiekkoInEdit: action.kiekko
          ? {
              ...action.kiekko,
              manufacturerId: action.kiekko.mold.manufacturer.id,
              moldId: action.kiekko.mold.id,
              plasticId: action.kiekko.plastic.id,
              colorId: action.kiekko.color.id,
            }
          : null,
      }
    case UPDATE_DISC_SUCCESS: {
      toast.success("Kiekon tiedot päivitetty")
      const kiekotUpdated = updateKiekotArray(state.kiekot, action.payload.data)
      return {
        ...state,
        isEditOpen: false,
        kiekot: kiekotUpdated,
      }
    }
    case CHOOSE_IMAGE_SUCCESS:
      return {
        ...state,
        image: action.base64,
        crop: {},
        pixelCrop: {
          width: "",
          height: "",
        },
      }
    case CANCEL_IMAGE_SELECTION:
      return {
        ...state,
        image: null,
      }
    case UPDATE_IMAGE_DIMENSIONS:
      return {
        ...state,
        imageDimensions: action.imageDimensions,
      }
    case UPLOAD_IMAGE_API:
    case UPDATE_IMAGE_API:
      return {
        ...state,
        imageUploading: true,
      }
    case UPLOAD_IMAGE_API_SUCCESS: {
      const kiekotUpdated = prepend(action.payload.data, state.kiekot)
      return {
        ...state,
        kiekkoInEdit: action.payload.data,
        kiekot: kiekotUpdated,
        isEditOpen: true,
        image: null,
        imageUploading: false,
      }
    }
    case UPDATE_IMAGE_API_SUCCESS: {
      return {
        ...state,
        image: null,
        imageUploading: false,
      }
    }
    case UPLOAD_IMAGE_API_FAILURE:
    case UPDATE_IMAGE_API_FAILURE:
      return {
        ...state,
        imageUploading: false,
      }
    case UPDATE_CROP:
      return {
        ...state,
        crop: action.crop,
        pixelCrop: action.pixelCrop,
      }
    case CROP_COMPLETE:
      return {
        ...state,
        croppedImage: action.image,
      }
    case LOST_REQUEST:
      return {
        ...state,
        lost: null,
        lostSort: action.sort,
        lostPagination: action.pagination,
      }
    case LOST_SUCCESS:
      return {
        ...state,
        lost: action.payload.data.content,
      }
    case FOUND_SUCCESS:
      toast.success("Kiekko merkitty löytyneeksi")
      return {
        ...state,
        lost: removeFromArrayById(state.lost, path(["meta", "previousAction", "id"], action)),
      }
    case DELETE_DISC_SUCCESS: {
      toast.success("Kiekko poistettu")
      const kiekotUpdated = removeFromArrayById(
        state.kiekot,
        path(["meta", "previousAction", "id"], action)
      )
      return {
        ...state,
        kiekot: kiekotUpdated,
      }
    }
    case DROPDOWNS_SUCCESS:
      const previousManufacturerId = path(["kiekkoInEdit", "mold", "manufacturer", "id"], state)
      const newManufacturerId = path(["meta", "previousAction", "valmId"], action)
      return {
        ...state,
        kiekkoInEdit:
          state.kiekkoInEdit && previousManufacturerId != newManufacturerId
            ? {
                ...state.kiekkoInEdit,
                valmId: newManufacturerId,
                mold: null,
                moldId: "",
                plastic: null,
                plasticId: "",
              }
            : state.kiekkoInEdit,
      }
    default:
      return state
  }
}

export default kiekkoReducer
