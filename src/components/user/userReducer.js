import { findIndex, propEq, prop, update } from "ramda"

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USERS_SUCCESS,
  USERS_FAILURE,
  TOGGLE_EDIT_MODAL,
  UPDATE_FAILURE,
  LOGOUT,
  LEADERS_SUCCESS,
  USER_DETAILS_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  UPDATE_SUCCESS
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

const updateUserArray = (users, updatedUser) => {
  const index = findIndex(propEq("id", prop("id", updatedUser)))(users)
  return update(index, updatedUser, users)
}

const updateCurrentUser = (currentUser, updatedUser) => {
  return prop("id", currentUser) === prop("id", updatedUser) ? updatedUser : currentUser
}

const saveToken = user => {
  localStorage.setItem("hamsteri-token", user.jwt)
}

const resetToken = () => {
  localStorage.removeItem("hamsteri-token")
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
    case GOOGLE_LOGIN_FAILURE:
      return {
        ...state,
        error: action.error ? "Kirjautuminen epäonnistui" : null,
        user: null,
        token: null
      }
    case LOGIN_SUCCESS:
      saveToken(action.payload.data)
      return {
        ...state,
        user: action.payload.data,
        token: action.payload.data.jwt,
        error: null,
        isEditModalOpen: false
      }
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
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
        users: action.payload.data,
        isEditModalOpen: false
      }
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: !state.isEditModalOpen,
        userInEdit: action.user
      }
    case UPDATE_SUCCESS:
      return {
        ...state,
        users: updateUserArray(state.users, action.payload.data),
        user: updateCurrentUser(state.user, action.payload.data),
        userInEdit: null,
        isEditModalOpen: false
      }
    case UPDATE_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LOGOUT:
      resetToken()
      return {
        ...initialState,
        token: null
      }
    case LEADERS_SUCCESS:
      return {
        ...state,
        leaders: action.payload.data
      }
    default:
      return state
  }
}

export default userReducer
