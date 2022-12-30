import { defaultSort } from "../shared/constants"
import { getSortColumn } from "../shared/utils"
import { MYYTAVAT_SUCCESS } from "./myytavatActions"

const initialState = {
  kiekot: [],
  sort: {},
}

const myytavatReducer = (state = initialState, action) => {
  switch (action.type) {
    case MYYTAVAT_SUCCESS:
      return {
        ...state,
        kiekot: action.payload.data.content,
        sortColumn: getSortColumn(action),
      }
    default:
      return state
  }
}

export default myytavatReducer
