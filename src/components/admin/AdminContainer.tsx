import React, { useState } from "react"
import { ConnectedProps, connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Box, Tab, Tabs } from "@mui/material"
import { pick } from "ramda"

import UsersComponent from "../user/UsersComponent"
import MoldsComponent from "../mold/MoldsComponent"
import PlasticsComponent from "../plastics/PlasticsComponent"
import { IDropdownsState, IMoldsState, IPagination, IPlasticsState, ISort, IUsersState, TMoldCreate, TPlasticCreate, TUser, TUserUpdate } from "../../types"
import { createMold, getMolds, getMoldsByManufacturer, toggleCreateModal as toggleMoldCreateModal } from "../mold/moldActions"
import { defaultMoldSort } from "../mold/moldReducer"
import { defaultPagination } from "../shared/constants"
import { getDropdowns } from "../dropdown/dropdownActions"
import { createPlastic, getPlastics, getPlasticsByManufacturer, toggleCreateModal as togglePlasticCreateModal } from "../plastics/plasticsActions"
import { defaultPlasticSort } from "../plastics/plasticsReducer"
import { defaultUserSort } from "../user/userReducer"
import { demoteUser, getUsers, promoteUser, toggleEditModal as toggleUserEditModal, updateUser } from "../user/userActions"

const mapState = ({ user, mold, plastic, dropdowns }: {
  user: IUsersState,
  mold: IMoldsState,
  plastic: IPlasticsState,
  dropdowns: IDropdownsState
}) => ({
  loggedIn: user.token,
  molds: mold.molds,
  dropdowns: dropdowns.dropdowns,
  isMoldCreateOpen: mold.isCreateOpen,
  moldSelectedManufacturer: mold.selectedManufacturer,
  moldSort: mold.sort,
  moldPagination: mold.pagination,
  plastics: plastic.plastics,
  isPlasticCreateOpen: plastic.isCreateOpen,
  plasticSelectedManufacturer: plastic.selectedManufacturer,
  plasticSort: plastic.sort,
  plasticPagination: plastic.pagination,
  users: user.users,
  isUserEditOpen: user.isEditModalOpen,
  userInEdit: user.userInEdit,
  userSort: user.sort,
  userPagination: user.pagination
})

const mapDispatch = {
  getInitialMolds: getMolds(defaultMoldSort, defaultPagination),
  getInitialPlastics: getPlastics(defaultPlasticSort, defaultPagination),
  getInitialUsers: getUsers(defaultUserSort, defaultPagination),
  getDropdowns: getDropdowns(),
  getMolds: (sort: ISort, pagination: IPagination) => getMolds(sort, pagination),
  getMoldsByManufacturer: (manufacturerId: number, sort: ISort, pagination: IPagination) => getMoldsByManufacturer(manufacturerId, sort, pagination),
  toggleMoldCreateModal: () => toggleMoldCreateModal(),
  createMold: (mold: TMoldCreate) => createMold(mold),
  getPlastics: (sort: ISort, pagination: IPagination) => getPlastics(sort, pagination),
  getPlasticsByManufacturer: (manufacturerId: number, sort: ISort, pagination: IPagination) => getPlasticsByManufacturer(manufacturerId, sort, pagination),
  togglePlasticCreateModal: () => togglePlasticCreateModal(),
  createPlastic: (plastic: TPlasticCreate) => createPlastic(plastic),
  getUsers: (sort: ISort, pagination: IPagination) => getUsers(sort, pagination),
  toggleUserEditModal: (user: TUser | null) => toggleUserEditModal(user),
  editUser: (id: number, user: TUserUpdate) => updateUser(id, user),
  promoteUser: (userId: number) => promoteUser(userId),
  demoteUser: (userId: number) => demoteUser(userId),
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export const AdminContainer = (props: PropsFromRedux): JSX.Element => {
  const moldsProps = pick([
    "loggedIn",
    "molds",
    "dropdowns",
    "isMoldCreateOpen",
    "moldSelectedManufacturer",
    "moldSort",
    "moldPagination"],
    props)
  const moldsDispatch = pick([
    "getMolds",
    "getMoldsByManufacturer",
    "toggleMoldCreateModal",
    "createMold"],
    props)

  const plasticsProps = pick([
    "loggedIn",
    "plastics",
    "dropdowns",
    "isPlasticCreateOpen",
    "plasticSelectedManufacturer",
    "plasticSort",
    "plasticPagination"],
    props)
  const plasticsDispatch = pick([
    "getPlastics",
    "getPlasticsByManufacturer",
    "togglePlasticCreateModal",
    "createPlastic"],
    props)

  const usersProps = pick([
    "loggedIn",
    "users",
    "isUserEditOpen",
    "userInEdit",
    "userSort",
    "userPagination"],
    props)
  const usersDispatch = pick([
    "getUsers",
    "toggleUserEditModal",
    "editUser",
    "promoteUser",
    "demoteUser"],
    props)

  const [tab, updateTab] = useState(1)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>Ylläpitäjän näkymä</h1>
      <Tabs value={tab} onChange={(_, newValue) => updateTab(newValue)}>
        <Tab label="Käyttäjät" value={1} />
        <Tab label="Muovit" value={2} />
        <Tab label="Mallit" value={3} />
      </Tabs>
      {tab === 1 && <UsersComponent props={usersProps} dispatch={usersDispatch} />}
      {tab === 2 && <PlasticsComponent props={plasticsProps} dispatch={plasticsDispatch} />}
      {tab === 3 && <MoldsComponent props={moldsProps} dispatch={moldsDispatch} />}
      {!props.loggedIn && <Navigate to="/" />}
    </Box>
  )
}

export default connector(AdminContainer)
