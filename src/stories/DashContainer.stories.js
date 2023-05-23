import React from "react"

import { DashContainer } from "../components/dash/DashContainer"
import { groupAdmin, testGroup, testUser } from "./data/testData"

export default {
  title: "Containers/Dash",
  component: DashContainer
}

const defaultProps = {
  promote: groupUser => alert("Promoting: " + JSON.stringify(groupUser)),
  demote: groupUser => alert("Demoting: " + JSON.stringify(groupUser)),
  kick: groupUser => alert("Kick: " + JSON.stringify(groupUser)),
  toggleEditModal: (user) => alert("Toggle edit modal: " + JSON.stringify(user)),
  editUser: (id, user) => alert("Editing user, id: " + id + ", user: " + JSON.stringify(user)),
  listUsers: (group) => alert("List users, group: " + JSON.stringify(group)),
  loggedIn: "xxx",
  user: testUser
}

export const noGroupUsers = () => <DashContainer {...defaultProps} />
export const fetchingGroupUsers = () => <DashContainer {...defaultProps} fetchingUsers />
export const groupUsers = () => <DashContainer {...defaultProps} users={[testUser, groupAdmin]} selectedGroup={testGroup} />
export const editModalOpen = () => <DashContainer {...defaultProps} isEditOpen userInEdit={testUser} />
export const loggedOut = () => <DashContainer />
