import React from "react"

import { AdminContainer } from "../components/admin/AdminContainer"
import { dropdowns, testMolds, testPlastics, testUsers } from "./data/testData"
import { defaultMoldSort } from "../components/mold/moldReducer"
import { defaultPagination } from "../components/shared/constants"
import { defaultPlasticSort } from "../components/plastics/plasticsReducer"
import { defaultUserSort } from "../components/user/userReducer"

const pagination = {
  ...defaultPagination,
  totalElements: 20
}

const props = {
  loggedIn: "xxx",
  molds: testMolds,
  dropdowns: dropdowns,
  isMoldCreateOpen: false,
  moldSelectedManufacturer: {},
  moldSort: defaultMoldSort,
  moldPagination: pagination,
  plastics: testPlastics,
  isPlasticCreateOpen: false,
  plasticSelectedManufacturer: {},
  plasticSort: defaultPlasticSort,
  plasticPagination: pagination,
  users: testUsers,
  isUserEditOpen: false,
  userInEdit: null,
  userSort: defaultUserSort,
  userPagination: pagination,
  getMolds: (sort, pagination) => alert("Get molds, sort: " + JSON.stringify(sort) + ", pagination: " + JSON.stringify(pagination)),
  getMoldsByManufacturer: (manufacturerId, sort, pagination) => alert("Get molds by manufacturer, manufacturerId: " + manufacturerId + ", sort: " + JSON.stringify(sort) + ", pagination: " + JSON.stringify(pagination)),
  toggleMoldCreateModal: () => alert("Toggle create modal"),
  createMold: (mold) => alert("Create mold: " + JSON.stringify(mold)),
  getPlastics: (sort, pagination) => alert("Get plastics, sort: " + JSON.stringify(sort) + ", pagination: " + JSON.stringify(pagination)),
  getPlasticsByManufacturer: (manufacturerId, sort, pagination) => alert("Get plastics by manufacturer, manufacturerId: " + manufacturerId + ", sort: " + JSON.stringify(sort) + ", pagination: " + JSON.stringify(pagination)),
  togglePlasticCreateModal: () => alert("Toggle create modal"),
  createPlastic: (plastic) => alert("Create plastic: " + JSON.stringify(plastic)),
  getUsers: (sort, pagination) => alert("Get users, sort: " + JSON.stringify(sort) + ", pagination: " + JSON.stringify(pagination)),
  toggleUserEditModal: user => alert("Toggle user edit modal: " + JSON.stringify(user)),
  editUser: (id, user) => alert("Edit user, id: " + id + ", user: " + JSON.stringify(user)),
  promoteUser: id => alert("Promote user id: " + id),
  demoteUser: id => alert("Demote user id: " + id)
}

export default {
  title: "Containers/Admin",
  component: AdminContainer
}

export const all10of20 = () => <AdminContainer {...props} />
