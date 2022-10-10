import { head, filter, append, reject, path, findIndex, propEq, prop, update } from "ramda"
import { toast } from "react-toastify"

import { COMPLETE_REQUEST_SUCCESS, CREATE_GROUP_FAILURE, CREATE_GROUP_SUCCESS, DELETE_GROUP_FAILURE, DELETE_GROUP_SUCCESS, DEMOTE_SUCCESS, GET_GROUPS_SUCCESS, GET_GROUP_REQUESTS_SUCCESS, GET_GROUP_USERS, GET_GROUP_USERS_FAILURE, GET_GROUP_USERS_SUCCESS, JOIN_GROUP_SUCCESS, KICK_SUCCESS, PROMOTE_SUCCESS } from "./groupActions"

const initialState = {
    groups: [],
    fetchingUsers: false,
    users: null,
    selectedGroup: {},
    requests: []
}

const updateUserArray = (users, updatedUser) => {
    const index = findIndex(propEq("id", prop("id", updatedUser)))(users)
    return update(index, updatedUser, users)
  }

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUPS_SUCCESS:
            return {
                ...state,
                groups: action.payload.data,
                users: null,
                selectedGroup: {}
            }
        case GET_GROUP_REQUESTS_SUCCESS:
            return {
                ...state,
                requests: action.payload.data
            }
        case GET_GROUP_USERS:
            return {
                ...state,
                users: null,
                fetchingUsers: true,
                selectedGroup: head(filter(g => g.id == action.groupId, state.groups))
            }
        case GET_GROUP_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.data,
                fetchingUsers: false
            }
        case GET_GROUP_USERS_FAILURE:
            return {
                ...state,
                users: null,
                fetchingUsers: false
            }
        case CREATE_GROUP_SUCCESS:
            toast.success("Ryhmän luonti onnistui")
            return {
                ...state,
                groups: append(action.payload.data, state.groups)
            }
        case CREATE_GROUP_FAILURE:
            const groupName = path(["meta", "previousAction", "payload", "request", "data", "name"], action)
            toast.error(`Ryhmä "${groupName}" on jo olemassa`)
            return state
        case COMPLETE_REQUEST_SUCCESS:
            path(["meta", "previousAction", "confirm"])
                ? toast.success("Pyyntö hyväksytty")
                : toast.info("Pyyntö poistettu")
            return {
                ...state,
                requests: reject(r => r.id == action.meta.previousAction.requestId, state.requests)
            }
        case DELETE_GROUP_SUCCESS:
            toast.success("Ryhmä poistettu")
            return {
                ...state,
                groups: reject(g => g.id == action.meta.previousAction.groupId, state.groups)
            }
        case DELETE_GROUP_FAILURE:
            path(["error", "response", "status"], action) == 409 && toast.error("Vain tyhjän ryhmän voi poistaa")
            return state
        case JOIN_GROUP_SUCCESS:
            path(["payload", "data", "status"], action) == "REQUESTED" && toast.info("Pyyntö rekisteröity")
            var completed = path(["payload", "data", "status"], action) == "COMPLETED"
            completed && toast.success("Toiminto suoritettu")
            return {
                ...state,
                users: (completed && state.users) ? append(action.payload.data.target, state.users) : state.users
            }
        case KICK_SUCCESS:
            path(["payload", "data", "status"], action) == "REQUESTED" && toast.info("Pyyntö rekisteröity")
            var completed = path(["payload", "data", "status"], action) == "COMPLETED"
            completed && toast.success("Toiminto suoritettu")
            return {
                ...state,
                users: completed ? reject(u => u.id == action.payload.data.target.id, state.users) : state.users
            }
        case PROMOTE_SUCCESS:
        case DEMOTE_SUCCESS:
            path(["payload", "data", "status"], action) == "REQUESTED" && toast.info("Pyyntö rekisteröity")
            path(["payload", "data", "status"], action) == "COMPLETED" && toast.success("Toiminto suoritettu")
            return {
                ...state,
                users: updateUserArray(state.users, action.payload.data.target)
            }
        default:
            return state
    }
}

export default groupReducer
