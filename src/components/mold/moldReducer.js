import { prepend } from "ramda"

import {
  CREATE_MOLD_SUCCESS,
  MOLDS_FAILURE,
  MOLDS_REQUEST,
  MOLDS_SUCCESS,
  TOGGLE_CREATE_MODAL,
} from "./moldActions"

const initialState = {
  molds: {
    content: [],
  },
  isCreateOpen: false,
  selectedManufacturer: {
    id: null,
    name: null
  },
}

const handleSelectedManufacturer = (id, molds) => {
  if(id === null) return { id: null, name: null }
  if(molds.length == 0) return { id, name: null }
  return { id, name: molds[0].manufacturer.name }
}

const moldReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOLDS_REQUEST:
      return {
        ...state,
        selectedManufacturer: {
          id: action.manufacturerId,
          name: null
        },
        isCreateOpen: false,
      }
    case MOLDS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case MOLDS_SUCCESS:
      return {
        ...state,
        molds: action.payload.data,
        selectedManufacturer: handleSelectedManufacturer(state.selectedManufacturer.id, action.payload.data.content)
      }
    case CREATE_MOLD_SUCCESS:
      return {
        ...state,
        molds: {
          ...state.molds,
          content: prepend(action.payload.data, state.molds.content),
        },
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
