import { ActionType } from "typesafe-actions"

import { components } from "./schemas/backend"
import * as dropdownActions from "./components/dropdown/dropdownActions"
import * as groupActions from "./components/group/groupActions"
import * as userActions from "./components/user/userActions"
import * as discsActions from "./components/discs/discsActions"
import * as moldActions from "./components/mold/moldActions"
import * as plasticActions from "./components/plastics/plasticsActions"
import * as othersActions from "./components/others/othersActions"
import * as shopActions from "./components/shop/shopActions"

//CUSTOM INTERFACES

export interface ISort {
  sort: string,
  column: string
}

export interface ISelectedManufacturer {
  id: number | null,
  name: string | null
}

export interface IPagination {
  number: number,
  size: number,
  totalElements: number,
}

// STATE INTERFACES

export interface IShopState {
  forSale: TDisc[],
  sort: ISort,
  pagination: IPagination,
  summary: TBuySummary
}

export interface IStatsSate {
  stats: TStats[] | null,
  sort: ISort
}

export interface IMoldsState {
  molds: TMold[],
  isCreateOpen: boolean,
  selectedManufacturer: ISelectedManufacturer,
  sort: ISort
  pagination: IPagination
}

export interface IPlasticsState {
  plastics: TPlastic[],
  isCreateOpen: boolean,
  selectedManufacturer: ISelectedManufacturer,
  sort: ISort
  pagination: IPagination
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
  userInEdit: TUser | null,
  pagination: IPagination,
  sort: ISort
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

//API INTERFACES

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

//CUSTOM TYPES

export type HasId = {
  id: number
}

export type HasUuid = {
  uuid: string
}

//TYPESAFE ACTIONS

export type DropdownActions = ActionType<typeof dropdownActions>
export type GroupActions = ActionType<typeof groupActions>
export type UserActions = ActionType<typeof userActions>
export type DiscsActions = ActionType<typeof discsActions>
export type MoldActions = ActionType<typeof moldActions>
export type PlasticActions = ActionType<typeof plasticActions>
export type OthersActions = ActionType<typeof othersActions>
export type ShopActions = ActionType<typeof shopActions>

//TYPES FROM OPENAPI

export type TUser = components["schemas"]["UserOutputDto"] & HasId
export type TUserUpdate = components["schemas"]["UserUpdateDto"]
export type TDropdowns = components["schemas"]["DropdownsDto"]
export type TGroup = components["schemas"]["GroupDto"] & HasId
export type TGroupRequest = components["schemas"]["GroupRequestOutputDto"] & HasId
export type TGroupCreate = components["schemas"]["GroupCreateDto"] & HasId
export type TUserRole = components["schemas"]["RoleDto"] & HasId
export type TDisc = components["schemas"]["DiscOutputDto"] & HasUuid
export type TMold = components["schemas"]["MoldOutputDto"]
export type TMoldCreate = components["schemas"]["MoldCreateDto"]
export type TPlastic = components["schemas"]["PlasticOutputDto"]
export type TPlasticCreate = components["schemas"]["PlasticCreateDto"]
export type TDiscInEdit = TDisc & {  
  manufacturerId?: number,
  moldId?: number,
  plasticId?: number,
  colorId?: number,
}
export type TSupportedOperation = components["schemas"]["SupportedOperation"]
export type TSearchCriteria = components["schemas"]["SearchCriteria"]
export type TStats = components["schemas"]["Stats"]
export type TBuySummary = components["schemas"]["BuySummaryDto"]
export type TBuy = components["schemas"]["BuyOutputDto"]
