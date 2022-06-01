import { MYYTAVAT_SUCCESS } from "./myytavatActions"

const initialState = {
  kiekot: [],
  sortColumn: "Id"
}

const myytavatReducer = (state = initialState, action) => {
  switch (action.type) {
    case MYYTAVAT_SUCCESS:
      return {
        ...state,
        kiekot: action.params.myytavat,
        sortColumn: action.params.newSortColumn
      }
    default:
      return state
  }
}

export default myytavatReducer
