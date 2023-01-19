import { DropdownActions, IDropdownsState } from "../../types"
import { DROPDOWNS_SUCCESS, DROPDOWNS_FAILURE } from "./dropdownActions"

const initialState: IDropdownsState = {
  dropdowns: {
    molds: [],
    manufacturers: [],
    plastics: [],
    colors: [],
    conditions: [],
    markings: [],
  },
}

const dropdownReducer = (state: IDropdownsState = initialState, action: DropdownActions): IDropdownsState => {
  switch (action.type) {
    case DROPDOWNS_FAILURE:
      return initialState
    case DROPDOWNS_SUCCESS:
      return {
        ...state,
        dropdowns: action.payload.data,
      }
    default:
      return state
  }
}

export default dropdownReducer
