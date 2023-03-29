import { append, reject, path, findIndex, update } from "ramda"
import { toast } from "react-toastify"
import { IGroupsState, TUser, GroupActions, TGroupRequest, TGroup } from "../../types"
import { updateUserArray } from "../shared/utils"

import {
  COMPLETE_REQUEST_SUCCESS,
  CREATE_GROUP_FAILURE,
  CREATE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE,
  DELETE_GROUP_SUCCESS,
  DEMOTE_SUCCESS,
  GET_GROUPS_SUCCESS,
  GET_GROUP_REQUESTS_SUCCESS,
  GET_GROUP_USERS,
  GET_GROUP_USERS_FAILURE,
  GET_GROUP_USERS_SUCCESS,
  JOIN_GROUP_SUCCESS,
  KICK_SUCCESS,
  PROMOTE_SUCCESS,
  RESET_GROUP_USERS,
} from "./groupActions"

const initialState: IGroupsState = {
  groups: [],
  fetchingUsers: false,
  users: [],
  selectedGroup: null,
  requests: [],
}

const groupReducer = (state: IGroupsState = initialState, action: GroupActions): IGroupsState => {
  switch (action.type) {
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload.data,
        users: [],
        selectedGroup: null,
      }
    case RESET_GROUP_USERS:
      return {
        ...state,
        users: [],
        selectedGroup: null,
      }
    case GET_GROUP_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.payload.data,
      }
    case GET_GROUP_USERS:
      return {
        ...state,
        users: [],
        fetchingUsers: true,
        selectedGroup: action.meta.group
      }
    case GET_GROUP_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        fetchingUsers: false,
      }
    case GET_GROUP_USERS_FAILURE:
      return {
        ...state,
        users: [],
        fetchingUsers: false,
      }
    case CREATE_GROUP_SUCCESS:
      toast.success("Ryhmän luonti onnistui")
      return {
        ...state,
        groups: append(action.payload.data, state.groups),
      }
    case CREATE_GROUP_FAILURE:
      const groupName = path(
        ["meta", "previousAction", "payload", "request", "data", "name"],
        action
      )
      toast.error(`Ryhmä "${groupName}" on jo olemassa`)
      return state
    case COMPLETE_REQUEST_SUCCESS:
      path(["meta", "previousAction", "meta", "confirm"], action)
        ? toast.success("Pyyntö hyväksytty")
        : toast.info("Pyyntö poistettu")
      return {
        ...state,
        requests: reject((r: TGroupRequest) => r.id == path(["meta", "previousAction", "meta", "requestId"], action), state.requests),
      }
    case DELETE_GROUP_SUCCESS:
      toast.success("Ryhmä poistettu")
      return {
        ...state,
        groups: reject((g: TGroup) => g.id == path(["meta", "previousAction", "meta", "groupId"], action), state.groups),
      }
    case DELETE_GROUP_FAILURE:
      path(["error", "response", "status"], action) == 409 &&
        toast.error("Vain tyhjän ryhmän voi poistaa")
      return state
    case JOIN_GROUP_SUCCESS:
      action.payload.data.status == "REQUESTED" && toast.info("Pyyntö rekisteröity")
      var completed = action.payload.data.status == "COMPLETED"
      completed && toast.success("Toiminto suoritettu")
      return {
        ...state,
        users:
          completed && state.users ? append(action.payload.data.target, state.users) : state.users,
      }
    case KICK_SUCCESS:
      action.payload.data.status == "REQUESTED" &&
        toast.info("Pyyntö rekisteröity")
      var completed = action.payload.data.status == "COMPLETED"
      completed && toast.success("Toiminto suoritettu")
      return {
        ...state,
        users: completed
          ? reject((u: TUser) => u.id == action.payload.data.target.id, state.users)
          : state.users,
      }
    case PROMOTE_SUCCESS:
    case DEMOTE_SUCCESS:
      action.payload.data.status == "REQUESTED" && toast.info("Pyyntö rekisteröity")
      action.payload.data.status == "COMPLETED" && toast.success("Toiminto suoritettu")
      return {
        ...state,
        users: updateUserArray(state.users, action.payload.data.target),
      }
    default:
      return state
  }
}

export default groupReducer
