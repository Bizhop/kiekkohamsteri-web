import { CHANGE_VIEW } from "./adminActions"

const initialState = {
    tab: "1"
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_VIEW:
            return {
                ...state,
                tab: action.newValue
            }
        default:
            return state
    }
}

export default adminReducer
