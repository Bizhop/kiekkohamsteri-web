import { pick, prepend } from "ramda"
import { IMoldsState, ISelectedManufacturer, ISort, MoldActions, TMold } from "../../types"
import { defaultPagination } from "../shared/constants"

import {
  CREATE_MOLD_SUCCESS,
  MOLDS_REQUEST,
  MOLDS_SUCCESS,
  TOGGLE_CREATE_MODAL,
} from "./moldActions"

export const defaultMoldSort: ISort = {
  sort: "manufacturer.name,asc&sort=name,asc",
  column: "Valmistaja"
}

const initialState: IMoldsState = {
  molds: [],
  isCreateOpen: false,
  selectedManufacturer: {},
  sort: defaultMoldSort,
  pagination: defaultPagination
}

const handleSelectedManufacturer = (id: number | undefined, molds: TMold[]): ISelectedManufacturer => {
  if (id === undefined) return {}
  if (molds.length == 0) return { id }
  return { id, name: molds[0].manufacturer.name }
}

const moldReducer = (state: IMoldsState = initialState, action: MoldActions) => {
  switch (action.type) {
    case MOLDS_REQUEST:
      return {
        ...state,
        selectedManufacturer: {
          id: action.meta.manufacturerId,
          name: null,
        },
        isCreateOpen: false,
        sort: action.meta.sort,
        pagination: action.meta.pagination
      }
    case MOLDS_SUCCESS:
      return {
        ...state,
        molds: action.payload.data.content,
        selectedManufacturer: handleSelectedManufacturer(
          state.selectedManufacturer.id,
          action.payload.data.content
        ),
        pagination: pick(["totalElements", "size", "number"], action.payload.data),
      }
    case CREATE_MOLD_SUCCESS:
      return {
        ...state,
        molds: prepend(action.payload.data, state.molds),
        isCreateOpen: false,
      }
    case TOGGLE_CREATE_MODAL:
      return {
        ...state,
        isCreateOpen: !state.isCreateOpen,
      }
    default:
      return state
  }
}

export default moldReducer
