import { action } from "typesafe-actions"

export const GET_GROUPS = "groups/GET"
export const GET_GROUPS_SUCCESS = "groups/GET_SUCCESS"
export const GET_GROUPS_FAILURE = "groups/GET_FAIL"
export const GET_GROUP_USERS = "groups/GET_USERS"
export const GET_GROUP_USERS_SUCCESS = "groups/GET_USERS_SUCCESS"
export const GET_GROUP_USERS_FAILURE = "groups/GET_USERS_FAIL"
export const CREATE_GROUP = "groups/CREATE"
export const CREATE_GROUP_SUCCESS = "groups/CREATE_SUCCESS"
export const CREATE_GROUP_FAILURE = "groups/CREATE_FAIL"
export const JOIN_GROUP = "groups/JOIN"
export const JOIN_GROUP_SUCCESS = "groups/JOIN_SUCCESS"
export const JOIN_GROUP_FAILURE = "groups/JOIN_FAIL"
export const GET_GROUP_REQUESTS = "groups/REQUESTS"
export const GET_GROUP_REQUESTS_SUCCESS = "groups/REQUESTS_SUCCESS"
export const GET_GROUP_REQUESTS_FAILURE = "groups/REQUESTS_FAIL"
export const COMPLETE_REQUEST = "groups/COMPLETE_REQUEST"
export const COMPLETE_REQUEST_SUCCESS = "groups/COMPLETE_REQUEST_SUCCESS"
export const COMPLETE_REQUEST_FAILURE = "groups/COMPLETE_REQUEST_FAIL"
export const PROMOTE = "groups/PROMOTE"
export const PROMOTE_SUCCESS = "groups/PROMOTE_SUCCESS"
export const PROMOTE_FAILURE = "groups/PROMOTE_FAIL"
export const DEMOTE = "groups/DEMOTE"
export const DEMOTE_SUCCESS = "groups/DEMOTE_SUCCESS"
export const DEMOTE_FAILURE = "groups/DEMOTE_FAIL"
export const KICK = "groups/KICK"
export const KICK_SUCCESS = "groups/KICK_SUCCESS"
export const KICK_FAILURE = "groups/KICK_FAIL"
export const DELETE_GROUP = "groups/DELETE_GROUP"
export const DELETE_GROUP_SUCCESS = "groups/DELETE_GROUP_SUCCESS"
export const DELETE_GROUP_FAILURE = "groups/DELETE_GROUP_FAIL"
export const RESET_GROUP_USERS = "groups/RESET_USERS"

import { deletePayloadTs, getPayloadTs, postPayloadTs } from "../Api"
import { IResponsePayload, TGroup, TGroupCreate, TGroupRequest, TUser } from "../../types"


export const getGroups = () => action(GET_GROUPS, getPayloadTs("api/v2/groups"))
export const getGroupsSuccess = (payload: IResponsePayload<TGroup[]>) => action(GET_GROUPS_SUCCESS, payload)
export const getGroupsFailure = () => action(GET_GROUPS_FAILURE)

export const getGroupUsers = (group: TGroup) => action(GET_GROUP_USERS, getPayloadTs(`api/v2/user?groupId=${group.id}`), { group })
export const getGroupUsersSuccess = (payload: IResponsePayload<TUser[]>) => action(GET_GROUP_USERS_SUCCESS, payload)
export const getGroupUsersFailure = () => action(GET_GROUP_USERS_FAILURE)

export const createGroup = (group: TGroupCreate) => action(CREATE_GROUP, postPayloadTs("api/v2/groups", group))
export const createGroupSuccess = (payload: IResponsePayload<TGroup>) => action(CREATE_GROUP_SUCCESS, payload)
export const createGroupFailure = () => action(CREATE_GROUP_FAILURE)

export const joinGroup = (userId: number, groupId: number) => action(JOIN_GROUP, postPayloadTs(
  `api/v2/groups/${groupId}/requests`,
  {
    targetUserId: userId,
    type: "JOIN",
    info: `Pyyntö liittyä ryhmään ${groupId}`,
  }
))
export const joinGroupSuccess = (payload: IResponsePayload<TGroupRequest>) => action(JOIN_GROUP_SUCCESS, payload)
export const joinGroupFailure = () => action(JOIN_GROUP_FAILURE)

export const getGroupRequests = () => action(GET_GROUP_REQUESTS, getPayloadTs("api/v2/groups/requests"))
export const getGroupRequestsSuccess = (payload: IResponsePayload<TGroupRequest[]>) => action(GET_GROUP_REQUESTS_SUCCESS, payload)
export const getGroupRequestsFailure = () => action(GET_GROUP_REQUESTS_FAILURE)

export const completeRequest = (groupId: number, requestId: number, confirm: boolean) => action(COMPLETE_REQUEST, postPayloadTs(
  `api/v2/groups/${groupId}/requests/${requestId}`,
  { confirm }
), { requestId, confirm })
export const completeRequestSuccess = (payload: IResponsePayload<TUser>) => action(COMPLETE_REQUEST_SUCCESS, payload)
export const completeRequestFailure = () => action(COMPLETE_REQUEST_FAILURE)

export const promote = (userId: number, groupId: number) => action(PROMOTE, postPayloadTs(
  `api/v2/groups/${groupId}/requests`,
  {
    targetUserId: userId,
    type: "PROMOTE",
    info: `Pyyntö ryhmän ${groupId} ylläpitäjäksi`,
  }
))
export const promoteSuccess = (payload: IResponsePayload<TGroupRequest>) => action(PROMOTE_SUCCESS, payload)
export const promoteFailure = () => action(PROMOTE_FAILURE)

export const demote = (userId: number, groupId: number) => action(DEMOTE, postPayloadTs(
  `api/v2/groups/${groupId}/requests`,
  {
    targetUserId: userId,
    type: "DEMOTE",
    info: `Pyyntö poistaa ryhmän ${groupId} ylläpitäjä`,
  }
))
export const demoteSuccess = (payload: IResponsePayload<TGroupRequest>) => action(DEMOTE_SUCCESS, payload)
export const demoteFailure = () => action(DEMOTE_FAILURE)

export const kick = (userId: number, groupId: number) => action(KICK, postPayloadTs(
  `api/v2/groups/${groupId}/requests`,
  {
    targetUserId: userId,
    type: "KICK",
    info: `Pyyntö poistaa ryhmästä ${groupId}`,
  }
))
export const kickSuccess = (payload: IResponsePayload<TGroupRequest>) => action(KICK_SUCCESS, payload)
export const kickFailure = () => action(KICK_FAILURE)

export const deleteGroup = (groupId: number) => action(DELETE_GROUP, deletePayloadTs(`api/v2/groups/${groupId}`), { groupId })
export const deleteGroupSuccess = () => action(DELETE_GROUP_SUCCESS)
export const deleteGroupFailure = () => action(DELETE_GROUP_FAILURE)

export const resetGroupUsers = () => action(RESET_GROUP_USERS)
