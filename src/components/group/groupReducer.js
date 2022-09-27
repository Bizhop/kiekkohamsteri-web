import { head, filter, append, reject } from "ramda"

import { COMPLETE_REQUEST_SUCCESS, CREATE_GROUP_SUCCESS, GET_GROUPS_SUCCESS, GET_GROUP_REQUESTS_SUCCESS, GET_GROUP_USERS, GET_GROUP_USERS_FAILURE, GET_GROUP_USERS_SUCCESS } from "./groupActions"

const initialState = {
    groups: [],
    fetchingUsers: false,
    users: null,
    selectedGroup: {},
    requests: []
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
            return {
                ...state,
                groups: append(action.payload.data, state.groups)
            }
        case COMPLETE_REQUEST_SUCCESS:
            return {
                ...state,
                requests: reject(r => r.id == action.meta.previousAction.requestId, state.requests)
            }
        default:
            return state
    }
}

export default groupReducer
