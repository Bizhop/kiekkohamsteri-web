export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const USERS_REQUEST = "USERS_REQUEST"
export const USERS_SUCCESS = "USERS_SUCCESS"
export const USERS_FAILURE = "USERS_FAILURE"
export const TOGGLE_EDIT_MODAL = "TOGGLE_EDIT_MODAL"
export const UPDATE_REQUEST = "UPDATE_REQUEST"
export const UPDATE_FAILURE = "UPDATE_FAILURE"
export const LOGOUT = "LOGOUT"
export const PROMOTE_USER = "PROMOTE_USER"
export const DEMOTE_USER = "DEMOTE_USER"
export const GET_MY_DETAILS = "GET_MY_DETAILS"
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS"
export const USER_DETAILS_FAILURE = "USER_DETAILS_FAILURE"
export const UPDATE_ME = "UPDATE_ME"
export const LEADERS_REQUEST = "LEADERS_REQUEST"
export const LEADERS_SUCCESS = "LEADERS_SUCCESS"
export const LEADERS_FAILURE = "LEADERS_FAILURE"

export const login = params => ({
  type: LOGIN_REQUEST,
  params
})

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user
})

export const loginError = error => ({
  type: LOGIN_FAILURE,
  error
})

export const logout = () => ({
  type: LOGOUT
})

export const getUsers = () => ({
  type: USERS_REQUEST
})

export const usersSuccess = users => ({
  type: USERS_SUCCESS,
  users
})

export const usersError = error => ({
  type: USERS_FAILURE,
  error
})

export const toggleEditModal = user => ({
  type: TOGGLE_EDIT_MODAL,
  user
})

export const requestUpdateUser = user => ({
  type: UPDATE_REQUEST,
  user
})

export const requestUpdateMe = user => ({
  type: UPDATE_ME,
  user
})

export const updateUserError = error => ({
  type: UPDATE_FAILURE,
  error
})

export const promoteUser = userId => ({
  type: PROMOTE_USER,
  userId
})

export const demoteUser = userId => ({
  type: DEMOTE_USER,
  userId
})

export const getMyDetails = () => ({
  type: GET_MY_DETAILS
})

export const userDetailsSuccess = user => ({
  type: USER_DETAILS_SUCCESS,
  user
})

export const userDetailsFailure = error => ({
  type: USER_DETAILS_FAILURE,
  error
})

export const getLeaders = () => ({
  type: LEADERS_REQUEST
})

export const leadersSuccess = leaders => ({
  type: LEADERS_SUCCESS,
  leaders
})

export const leadersError = error => ({
  type: LEADERS_FAILURE,
  error
})
