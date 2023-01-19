import { ActionType } from "typesafe-actions"

import { components } from "./schemas/backend"
import * as dropdownActions from "./components/dropdown/dropdownActions"

export interface IDropdownsState {
  dropdowns: components["schemas"]["DropdownsDto"]
}

interface IRequest {
  url: string,
  headers?: any,
  method?: string,
  data?: any
}

export interface IRequestPayload {
  request: IRequest
}

export interface IResponsePayload<T> {
  data: T
}

export type DropdownActions = ActionType<typeof dropdownActions>
