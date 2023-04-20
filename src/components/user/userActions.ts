import { action } from "typesafe-actions"

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
export const USER_DETAILS_REQUEST = "users/USER_DETAILS"
export const USER_DETAILS_SUCCESS = "users/USER_DETAILS_SUCCESS"
export const USER_DETAILS_FAILURE = "users/USER_DETAILS_FAIL"

import { getPayloadTs, loginPayloadTs, patchPayloadTs } from "../Api"
import { CredentialResponse } from "@react-oauth/google"
import { IPagination, IResponsePagedPayload, IResponsePayload, ISort, TUser, TUserUpdate } from "../../types"
import { pagingAndSortingQueryParams } from "../shared/utils"

export const login = (response: CredentialResponse) => action(LOGIN_REQUEST, loginPayloadTs(response.credential))
export const loginSuccess = (payload: IResponsePayload<TUser>) => action(LOGIN_SUCCESS, payload)
export const loginFailure = () => action(LOGIN_FAILURE)

export const getMyDetails = () => action(USER_DETAILS_REQUEST, getPayloadTs("api/v2/user/me"))
export const getMyDetailsSuccess = (payload: IResponsePayload<TUser>) => action(USER_DETAILS_SUCCESS, payload)
export const getMyDetailsFailure = () => action(USER_DETAILS_FAILURE)

export const getUsers = (sort: ISort, pagination: IPagination) => action(
  USERS_REQUEST,
  getPayloadTs(`api/v2/user?${pagingAndSortingQueryParams(sort, pagination)}`),
  { sort, pagination }
)
export const getUsersSuccess = (payload: IResponsePagedPayload<TUser>) => action(USERS_SUCCESS, payload)
export const getUsersFailure = () => action(USERS_FAILURE)

export const updateUser = (id: number, user: TUserUpdate) => action(UPDATE_REQUEST, patchPayloadTs(`api/v2/user/${id}`, user))
export const promoteUser = (userId: number) => action(UPDATE_REQUEST, patchPayloadTs(`api/v2/user/${userId}`, { addToRole: "ADMIN" }))
export const demoteUser = (userId: number) => action(UPDATE_REQUEST, patchPayloadTs(`api/v2/user/${userId}`, { removeFromRole: "ADMIN" }))
export const updateUserSuccess = (payload: IResponsePayload<TUser>) => action(UPDATE_SUCCESS, payload)
export const updateUserFailure = () => action(UPDATE_FAILURE)

export const toggleEditModal = (user: TUser | null) => action(TOGGLE_EDIT_MODAL, { user })
export const googleLoginError = () => action(GOOGLE_LOGIN_FAILURE)
export const logout = () => action(LOGOUT)
