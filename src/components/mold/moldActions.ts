import { action } from "typesafe-actions"
import { IPagination, IResponsePagedPayload, IResponsePayload, ISort, TMold, TMoldCreate } from "../../types"

export const MOLDS_REQUEST = "molds/GET"
export const MOLDS_SUCCESS = "molds/GET_SUCCESS"
export const MOLDS_FAILURE = "molds/GET_FAIL"
export const CREATE_MOLD_REQUEST = "molds/CREATE"
export const CREATE_MOLD_SUCCESS = "molds/CREATE_SUCCESS"
export const CREATE_MOLD_FAILURE = "molds/CREATE_FAIL"
export const TOGGLE_CREATE_MODAL = "molds/TOGGLE_CREATE_MODAL"

import { getPayloadTs, postPayloadTs } from "../Api"
import { pagingAndSortingQueryParams } from "../shared/utils"

export const getMolds = (sort: ISort, pagination: IPagination) => action(
  MOLDS_REQUEST,
  getPayloadTs(`api/v2/discs/molds?${pagingAndSortingQueryParams(sort, pagination)}`),
  { manufacturerId: null, sort, pagination })
export const getMoldsByManufacturer = (manufacturerId: number, sort: ISort, pagination: IPagination) => action(
  MOLDS_REQUEST,
  getPayloadTs(`api/v2/discs/molds?${pagingAndSortingQueryParams(sort, pagination)}&manufacturerId=${manufacturerId}`),
  { manufacturerId, sort, pagination })
export const getMoldsSuccess = (payload: IResponsePagedPayload<TMold>) => action(MOLDS_SUCCESS, payload)
export const getMoldsFailure = () => action(MOLDS_FAILURE)

export const createMold = (mold: TMoldCreate) => action(CREATE_MOLD_REQUEST, postPayloadTs("api/v2/discs/molds", mold))
export const createMoldSuccess = (payload: IResponsePayload<TMold>) => action(CREATE_MOLD_SUCCESS, payload)
export const createMoldFailure = () => action(CREATE_MOLD_FAILURE)

export const toggleCreateModal = () => action(TOGGLE_CREATE_MODAL)
