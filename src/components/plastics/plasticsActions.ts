import { action } from "typesafe-actions"

export const PLASTICS_REQUEST = "plastics/GET"
export const PLASTICS_SUCCESS = "plastics/GET_SUCCESS"
export const PLASTICS_FAILURE = "plastics/GET_FAIL"
export const TOGGLE_CREATE_MODAL = "plastics/TOGGLE_CREATE_MODAL"
export const CREATE_PLASTIC_REQUEST = "plastics/CREATE"
export const CREATE_PLASTIC_SUCCESS = "plastics/CREATE_SUCCESS"
export const CREATE_PLASTIC_FAILURE = "plastics/CREATE_FAIL"

import { IPagination, IResponsePagedPayload, IResponsePayload, ISort, TPlastic, TPlasticCreate } from "../../types"
import { getPayloadTs, postPayloadTs } from "../Api"
import { pagingAndSortingQueryParams } from "../shared/utils"

export const getPlastics = (sort: ISort, pagination: IPagination) => action(
  PLASTICS_REQUEST,
  getPayloadTs(`api/v2/discs/plastics?${pagingAndSortingQueryParams(sort, pagination)}`),
  { manufacturerId: null, sort, pagination }
)
export const getPlasticsByManufacturer = (manufacturerId: number, sort: ISort, pagination: IPagination) => action(
  PLASTICS_REQUEST,
  getPayloadTs(`api/v2/discs/plastics?${pagingAndSortingQueryParams(sort, pagination)}&manufacturerId=${manufacturerId}`),
  { manufacturerId, sort, pagination }
)
export const getPlasticsSuccess = (payload: IResponsePagedPayload<TPlastic>) => action(PLASTICS_SUCCESS, payload)
export const getPlasticsFailure = () => action(PLASTICS_FAILURE)

export const createPlastic = (plastic: TPlasticCreate) => action(CREATE_PLASTIC_REQUEST, postPayloadTs("api/v2/discs/plastics", plastic))
export const createPlasticSuccess = (payload: IResponsePayload<TPlastic>) => action(CREATE_PLASTIC_SUCCESS, payload)
export const createPlasticFailure = () => action(CREATE_PLASTIC_FAILURE)

export const toggleCreateModal = () => action(TOGGLE_CREATE_MODAL)
