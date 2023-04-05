import { pick, prepend } from "ramda"
import { IPlasticsState, ISelectedManufacturer, ISort, PlasticActions, TPlastic } from "../../types"
import { defaultPagination } from "../shared/constants"

import {
  PLASTICS_REQUEST,
  PLASTICS_SUCCESS,
  CREATE_PLASTIC_SUCCESS,
  TOGGLE_CREATE_MODAL,
} from "./plasticsActions"

export const defaultPlasticSort: ISort = {
  sort: "manufacturer.name,asc&sort=name,asc",
  column: "Valmistaja"
}

const initialState: IPlasticsState = {
  plastics: [],
  isCreateOpen: false,
  selectedManufacturer: {
    id: null,
    name: null,
  },
  sort: defaultPlasticSort,
  pagination: defaultPagination
}

const handleSelectedManufacturer = (id: number | null, plastics: TPlastic[]): ISelectedManufacturer => {
  if (id === null) return { id: null, name: null }
  if (plastics.length == 0) return { id, name: null }
  return { id, name: plastics[0].manufacturer.name }
}

const plasticsReducer = (state: IPlasticsState = initialState, action: PlasticActions) => {
  switch (action.type) {
    case PLASTICS_REQUEST:
      return {
        ...state,
        selectedManufacturer: {
          id: action.meta.manufacturerId,
          name: null,
        },
        isCreateOpen: false,
      }
    case PLASTICS_SUCCESS:
      return {
        ...state,
        plastics: action.payload.data.content,
        selectedManufacturer: handleSelectedManufacturer(
          state.selectedManufacturer.id,
          action.payload.data.content
        ),
        pagination: pick(["totalElements", "size", "number"], action.payload.data),
      }
    case CREATE_PLASTIC_SUCCESS: {
      return {
        ...state,
        plastics: prepend(action.payload.data, state.plastics),
        isCreateOpen: false,
      }
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

export default plasticsReducer
