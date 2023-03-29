import { ActionType } from "typesafe-actions"

import { components } from "./schemas/backend"
import * as dropdownActions from "./components/dropdown/dropdownActions"
import * as groupActions from "./components/group/groupActions"
import * as userActions from "./components/user/userActions"
import * as discsActions from "./components/discs/discsActions"

export interface ISort {
  sort: string,
  column: string
}

export interface IPagination {
  number: number,
  size: number,
  totalElements: number,
}

export interface IDropdownsState {
  dropdowns: TDropdowns
}

export interface IGroupsState {
  groups: TGroup[],
  fetchingUsers: boolean,
  users: TUser[],
  selectedGroup: TGroup | null,
  requests: TGroupRequest[],
}

export interface IUsersState {
  user: TUser | null,
  token: string | null,
  users: TUser[],
  isEditModalOpen: boolean,
  userInEdit: TUser | null
}

export interface IDiscsState {
  discs: TDisc[],
  disc: TDisc | null,
  isEditOpen: boolean,
  discInEdit: TDiscInEdit | null,
  oneDiscText: string,
  lost: TDisc[] | null,
  lostSort: ISort | null,
  lostPagination: IPagination | null,
  imageUploading: boolean,
  otherUserDiscs: boolean,
  otherUserName: string,
  searchOperations: TSupportedOperation[],
  pagination: IPagination,
  sort: ISort
}

interface IRequest {
  url: string,
  headers?: unknown,
  method?: string,
  data?: unknown
}

export interface IRequestPayload {
  request: IRequest
}

export interface IResponsePayload<T> {
  data: T
}

export interface IResponsePagedPayload<T> {
  data: {
    content: T[],
    number: number,
    size: number,
    totalElements: number,
  },
}

export type HasId = {
  id: number
}

export type HasUuid = {
  uuid: string
}

export type DropdownActions = ActionType<typeof dropdownActions>
export type GroupActions = ActionType<typeof groupActions>
export type UserActions = ActionType<typeof userActions>
export type DiscsActions = ActionType<typeof discsActions>

export type TUser = components["schemas"]["UserOutputDto"] & HasId
export type TDropdowns = components["schemas"]["DropdownsDto"]
export type TGroup = components["schemas"]["GroupDto"] & HasId
export type TGroupRequest = components["schemas"]["GroupRequestOutputDto"] & HasId
export type TGroupCreate = components["schemas"]["GroupCreateDto"] & HasId
export type TUserRole = components["schemas"]["RoleDto"] & HasId
export type TDisc = components["schemas"]["DiscOutputDto"] & HasUuid
export type TMold = components["schemas"]["MoldOutputDto"]
export type TPlastic = components["schemas"]["PlasticOutputDto"]
export type TDiscInEdit = TDisc & {  
  manufacturerId?: number,
  moldId?: number,
  plasticId?: number,
  colorId?: number,
}
export type TSupportedOperation = components["schemas"]["SupportedOperation"]
export type TSearchCriteria = components["schemas"]["SearchCriteria"]
