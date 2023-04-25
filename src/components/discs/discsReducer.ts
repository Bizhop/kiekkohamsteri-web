import { prop, propEq, findIndex, update, path, prepend, length, head, pick, pathOr } from "ramda"
import { toast } from "react-toastify"

import {
  DISCS_REQUEST,
  DISCS_SUCCESS,
  DISCS_FAILURE,
  TOGGLE_DISC_EDIT_MODAL,
  DISC_SUCCESS,
  DISC_REQUEST,
  DISC_FAILURE,
  SEARCH_DISCS_REQUEST,
  SEARCH_DISCS_SUCCESS,
  SEARCH_DISCS_FAILURE,
  LOST_REQUEST,
  LOST_SUCCESS,
  UPDATE_DISC_SUCCESS,
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
  CREATE_DISC_SUCCESS,
} from "./discsActions"
import { DROPDOWNS_SUCCESS } from "../dropdown/dropdownActions"
import { removeFromArrayByUuid } from "../shared/utils"
import { defaultSort, defaultPagination } from "../shared/constants"
import { DiscsActions, DropdownActions, IDiscsState, TDisc, TDiscInEdit } from "../../types"

const initialState: IDiscsState = {
  discs: [],
  disc: null,
  isEditOpen: false,
  discInEdit: null,
  oneDiscText: "",
  lost: null,
  lostSort: null,
  lostPagination: null,
  imageUploading: false,
  otherUserDiscs: false,
  otherUserName: "",
  searchOperations: [],
  pagination: defaultPagination,
  sort: defaultSort
}

const updateDiscsArray = (inputArray: TDisc[], disc: TDisc): TDisc[] => {
  const index = findIndex(propEq("uuid", prop("uuid", disc)))(inputArray)
  return update(index, disc, inputArray)
}

const prepareDiscInEdit = (input: TDisc | null): TDiscInEdit | null => {
  return input ? {
      ...input,
      manufacturerId: input.mold?.manufacturer.id,
      moldId: input.mold?.id,
      plasticId: input.plastic?.id,
      colorId: input.color.id,
    }
  : null
}

const discsReducer = (state: IDiscsState = initialState, action: DiscsActions | DropdownActions): IDiscsState => {
  switch (action.type) {
    case DISCS_REQUEST:
    case SEARCH_DISCS_REQUEST:
      return {
        ...state,
        discs: [],
        otherUserDiscs: false,
        otherUserName: "",
      }
    case OTHER_USER_DISCS:
      return {
        ...state,
        discs: [],
        otherUserDiscs: true,
      }
    case DISCS_SUCCESS:
    case OTHER_USER_DISCS_SUCCESS:
    case SEARCH_DISCS_SUCCESS:
      const data = action.payload.data
      const discs = data.content
      return {
        ...state,
        discs: discs,
        isEditOpen: false,
        discInEdit: null,
        disc: null,
        otherUserName: length(discs) > 0 ? pathOr("", ["owner", "username"], head(discs)) : "",
        pagination: pick(["totalElements", "size", "number"], data),
        sort: pathOr(defaultSort, ["meta", "previousAction", "meta", "sort"], action)
      }
    case DISCS_FAILURE:
    case SEARCH_DISCS_FAILURE:
      toast.error("Kiekkojen haku epäonnistui")
      return {
        ...state,
        discs: [],
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
        disc: null,
        oneDiscText: "Haetaan...",
      }
    case DISC_SUCCESS:
      return {
        ...state,
        disc: action.payload.data,
        oneDiscText: "",
      }
    case DISC_FAILURE:
      return {
        ...state,
        disc: null,
        oneDiscText: "Ei saatavilla",
      }
    case TOGGLE_DISC_EDIT_MODAL:
      const disc = action.payload.disc
      return {
        ...state,
        isEditOpen: !state.isEditOpen,
        discInEdit: prepareDiscInEdit(disc),
      }
    case UPDATE_DISC_SUCCESS: {
      toast.success("Kiekon tiedot päivitetty")
      const discsUpdated = updateDiscsArray(state.discs, action.payload.data)
      return {
        ...state,
        isEditOpen: false,
        discs: discsUpdated,
      }
    }
    case CREATE_DISC_SUCCESS: {
      return {
        ...state,
        discInEdit: prepareDiscInEdit(action.payload.data),
        isEditOpen: true
      }
    }
    case UPDATE_IMAGE_API:
      return {
        ...state,
        imageUploading: true,
      }
    case UPDATE_IMAGE_API_SUCCESS: {
      toast.success("Kiekon kuva päivitetty")
      const discsUpdated = updateDiscsArray(state.discs, action.payload.data)
      return {
        ...state,
        imageUploading: false,
        discs: discsUpdated,
      }
    }
    case UPDATE_IMAGE_API_FAILURE:
      return {
        ...state,
        imageUploading: false,
      }
    case LOST_REQUEST:
      return {
        ...state,
        lost: null,
        lostSort: action.meta.sort,
      }
    case LOST_SUCCESS: {
      const data = action.payload.data
      return {
        ...state,
        lost: data.content,
        lostPagination: pick(["totalElements", "size", "number"], data),
      }
    }
    case FOUND_SUCCESS:
      toast.success("Kiekko merkitty löytyneeksi")
      return {
        ...state,
        lost: removeFromArrayByUuid(state.lost, pathOr("", ["meta", "previousAction", "uuid"], action)),
      }
    case DELETE_DISC_SUCCESS: {
      toast.success("Kiekko poistettu")
      const discsUpdated = removeFromArrayByUuid(
        state.discs,
        pathOr("", ["meta", "previousAction", "meta", "uuid"], action)
      )
      return {
        ...state,
        discs: discsUpdated ? discsUpdated : [],
      }
    }
    case DROPDOWNS_SUCCESS:
      const previousManufacturerId = path(["discInEdit", "mold", "manufacturer", "id"], state)
      const newManufacturerId = pathOr(undefined, ["meta", "previousAction", "meta", "manufacturerId"], action)
      return {
        ...state,
        discInEdit:
          state.discInEdit && previousManufacturerId != newManufacturerId
            ? {
                ...state.discInEdit,
                manufacturerId: newManufacturerId,
                mold: undefined,
                moldId: undefined,
                plastic: undefined,
                plasticId: undefined,
              }
            : state.discInEdit,
      }
    default:
      return state
  }
}

export default discsReducer
