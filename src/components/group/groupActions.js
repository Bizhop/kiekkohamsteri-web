import { getPayload, postPayload } from "../Api"

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

export const getGroups = () => ({
    type: GET_GROUPS,
    payload: getPayload({url: "api/v2/groups"})
})

export const getGroupUsers = groupId => ({
    type: GET_GROUP_USERS,
    payload: getPayload({url: `api/v2/user?groupId=${groupId}`}),
    groupId
})

export const createGroup = group => ({
    type: CREATE_GROUP,
    payload: postPayload({
        url: "api/v2/groups",
        data: group
    })
})

export const joinGroup = ({ userId, groupId }) => ({
    type: JOIN_GROUP,
    payload: postPayload({
        url: `api/v2/groups/${groupId}/requests`,
        data: {
            targetUserId: userId,
            type: "JOIN",
            info: `Pyyntö liittyä ryhmään ${groupId}`
        }
    })
})

export const getGroupRequests = () => ({
    type: GET_GROUP_REQUESTS,
    payload: getPayload({ url: "api/v2/groups/requests" })
})

export const completeRequest = ({ groupId, requestId, confirm }) => ({
    type: COMPLETE_REQUEST,
    payload: postPayload({ 
        url: `api/v2/groups/${groupId}/requests/${requestId}`,
        data: { confirm }
    }),
    requestId
})
