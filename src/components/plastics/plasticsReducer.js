import { prepend } from "ramda"

import {
  PLASTICS_REQUEST,
  PLASTICS_SUCCESS,
  PLASTICS_FAILURE,
  CREATE_PLASTIC_SUCCESS,
  TOGGLE_CREATE_MODAL,
} from "./plasticsActions"

const initialState = {
  plastics: {
    content: [],
  },
  isCreateOpen: false,
  selectedManufacturer: {
    id: null,
    name: null,
  },
}

const handleSelectedManufacturer = (id, plastics) => {
  if (id === null) return { id: null, name: null }
  if (plastics.length == 0) return { id, name: null }
  return { id, name: plastics[0].manufacturer.name }
}

const plasticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLASTICS_REQUEST:
      return {
        ...state,
        selectedManufacturer: {
          id: action.manufacturerId,
          name: null,
        },
        isCreateOpen: false,
      }
    case PLASTICS_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case PLASTICS_SUCCESS:
      return {
        ...state,
        plastics: action.payload.data,
        selectedManufacturer: handleSelectedManufacturer(
          state.selectedManufacturer.id,
          action.payload.data.content
        ),
      }
    case CREATE_PLASTIC_SUCCESS: {
      return {
        ...state,
        plastics: {
          ...state.plastics,
          content: prepend(action.payload.data, state.plastics.content),
        },
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
