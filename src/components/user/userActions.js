import { getPayload, loginPayload, patchPayload } from "../Api"
import { pick } from "ramda"

export const LOGIN_REQUEST = "users/LOGIN"
export const LOGIN_SUCCESS = "users/LOGIN_SUCCESS"
export const LOGIN_FAILURE = "users/LOGIN_FAIL"
export const GOOGLE_LOGIN_FAILURE = "users/GOOGLE_LOGIN_FAILURE"
export const USERS_REQUEST = "users/GET"
export const USERS_SUCCESS = "users/GET_SUCCESS"
export const USERS_FAILURE = "users/GET_FAIL"
export const TOGGLE_EDIT_MODAL = "users/TOGGLE_EDIT_MODAL"
export const UPDATE_REQUEST = "users/UPDATE"
export const UPDATE_SUCCESS = "users/UPDATE_SUCCESS"
export const UPDATE_FAILURE = "users/UPDATE_FAIL"
export const LOGOUT = "users/LOGOUT"
export const GET_MY_DETAILS = "users/USER_DETAILS"
export const USER_DETAILS_SUCCESS = "users/USER_DETAILS_SUCCESS"
export const USER_DETAILS_FAILURE = "users/USER_DETAILS_FAIL"
export const LEADERS_REQUEST = "users/LEADERS"
export const LEADERS_SUCCESS = "users/LEADERS_SUCCESS"
export const LEADERS_FAILURE = "users/LEADERS_FAIL"

export const login = params => ({
  type: LOGIN_REQUEST,
  payload: loginPayload(params)
})

export const googleLoginError = error => ({
  type: GOOGLE_LOGIN_FAILURE,
  error
})

export const logout = () => ({
  type: LOGOUT
})

export const getUsers = () => ({
  type: USERS_REQUEST,
  payload: getPayload({url: "api/user"})
})

export const toggleEditModal = user => ({
  type: TOGGLE_EDIT_MODAL,
  user
})

export const updateUser = user => ({
  type: UPDATE_REQUEST,
  payload: patchPayload({
    url: `api/user/${user.id}`,
    data: pick(["username", "etunimi", "sukunimi", "pdga_num"], user)
  })
})

export const requestUpdateMe = user => ({
  type: UPDATE_REQUEST,
  payload: patchPayload({
    url: `api/user/${user.id}`,
    data: pick(["username", "etunimi", "sukunimi", "pdga_num","publicDiscCount", "publicList"], user)
  })
})

export const updateUserError = error => ({
  type: UPDATE_FAILURE,
  error
})

export const promoteUser = userId => ({
  type: UPDATE_REQUEST,
  payload: patchPayload({
    url: `api/user/${userId}/level/2`,
    data: null
  })
})

export const demoteUser = userId => ({
  type: UPDATE_REQUEST,
  payload: patchPayload({
    url: `api/user/${userId}/level/1`,
    data: null
  })
})

export const getMyDetails = () => ({
  type: GET_MY_DETAILS,
  payload: getPayload({url: "api/user/me"})
})

export const getLeaders = () => ({
  type: LEADERS_REQUEST,
  payload: getPayload({url: "api/user/leaders"})
})
