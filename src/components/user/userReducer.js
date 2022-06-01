import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USERS_SUCCESS,
  USERS_FAILURE,
  TOGGLE_EDIT_MODAL,
  UPDATE_FAILURE,
  LOGOUT,
  LOGIN_ERROR,
  LEADERS_SUCCESS,
  USER_DETAILS_SUCCESS
} from "./userActions"

const initialState = {
  user: null,
  token: localStorage.getItem("hamsteri-token"),
  users: [],
  error: null,
  isEditModalOpen: false,
  userInEdit: {},
  leaders: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        user: null,
        token: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        token: localStorage.getItem("hamsteri-token"),
        error: null,
        isEditModalOpen: false
      }
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: null,
        isEditModalOpen: false
      }
    case USERS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        isEditModalOpen: false
      }
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: !state.isEditModalOpen,
        userInEdit: action.user
      }
    case UPDATE_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LOGOUT:
    case LOGIN_ERROR:
      localStorage.removeItem("hamsteri-token")
      return {
        ...initialState,
        token: null
      }
    case LEADERS_SUCCESS:
      return {
        ...state,
        leaders: action.leaders
      }
    default:
      return state
  }
}

export default userReducer
