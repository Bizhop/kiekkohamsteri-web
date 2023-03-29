import { action } from "typesafe-actions"

export const DROPDOWNS_REQUEST = "dropdowns/GET"
export const DROPDOWNS_SUCCESS = "dropdowns/GET_SUCCESS"
export const DROPDOWNS_FAILURE = "dropdowns/GET_FAIL"

import { getPayloadTs } from "../Api"
import { IResponsePayload, TDropdowns } from "../../types"

export const getDropdowns = () => action(DROPDOWNS_REQUEST, getPayloadTs("api/v2/dropdowns"))
export const getDropdownsByManufacturer = (manufacturerId: number) => action(DROPDOWNS_REQUEST, getPayloadTs(`api/v2/dropdowns?manufacturerId=${manufacturerId}`), { manufacturerId })
export const getDropdownsSuccess = (payload: IResponsePayload<TDropdowns>) => action(DROPDOWNS_SUCCESS, payload)
export const getDropdownsFailure = () => action(DROPDOWNS_FAILURE)
