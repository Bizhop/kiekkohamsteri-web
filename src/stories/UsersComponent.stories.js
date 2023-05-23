import React from "react"

import UsersComponent from "../components/user/UsersComponent"
import { testUser, testUsers } from "./data/testData"
import { defaultUserSort } from "../components/user/userReducer"
import { defaultPagination } from "../components/shared/constants"

const usersProps = {
  loggedIn: "xxx",
  users: testUsers,
  isUserEditOpen: false,
  userInEdit: testUser,
  userSort: defaultUserSort,
  userPagination: {...defaultPagination, totalElements: 20}
}

const usersDispatch = {
  getUsers: (sort, pagination) => alert("Get users, sort: " + JSON.stringify(sort) + ", pagination: " + JSON.stringify(pagination)),
  toggleUserEditModal: user => alert("Toggle user edit modal: " + JSON.stringify(user)),
  editUser: (id, user) => alert("Edit user, id: " + id + ", user: " + JSON.stringify(user)),
  promoteUser: id => alert("Promote user id: " + id),
  demoteUser: id => alert("Demote user id: " + id)
}

export default {
  title: "Components/Users",
  component: UsersComponent
}

export const users10of20 = () => <UsersComponent props={usersProps} dispatch={usersDispatch} />
export const userEditOpen = () => <UsersComponent props={{...usersProps, isUserEditOpen: true}} dispatch={usersDispatch} />
