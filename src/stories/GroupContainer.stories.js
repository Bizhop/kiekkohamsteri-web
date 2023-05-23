import React from "react"

import { GroupContainer } from "../components/group/GroupContainer"
import { groupAdmin, groupRequests, testGroup, testUser } from "./data/testData"

export default {
  title: "Containers/Group",
  component: GroupContainer
}

const defaultProps = {
  requests: groupRequests,
  groups: [testGroup],
  newGroup: group => alert("Create group: " + JSON.stringify(group)),
  loggedIn: "xxx",
  completeRequest: request => alert("Completing request: " + JSON.stringify(request)),
  user: testUser,
  listUsers: (group) => alert("List users, group: " + JSON.stringify(group)),
  promote: groupUser => alert("Promoting: " + JSON.stringify(groupUser)),
  demote: groupUser => alert("Demoting: " + JSON.stringify(groupUser)),
  kick: groupUser => alert("Kick: " + JSON.stringify(groupUser)),
  deleteGroup: id => alert("Deleting group, id: " + id)
}

export const noGroupUsers = () => <GroupContainer {...defaultProps} />
export const fetchingGroupUsers = () => <GroupContainer {...defaultProps} fetchingUsers />
export const groupUsers = () => <GroupContainer {...defaultProps} selectedGroup={testGroup} users={[testUser, groupAdmin]} />
export const asGroupAdmin = () => <GroupContainer {...defaultProps} user={groupAdmin} />
