import React, { useState } from "react"
import { ConnectedProps, connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Box, Tab, Tabs } from "@mui/material"

import UserContainer from "../user/UserContainer"
import MoldComponent from "../mold/MoldComponent"
import PlasticsContainer from "../plastics/PlasticsContainer"
import { IDropdownsState, IMoldsState, IPagination, ISort, IUsersState, TMoldCreate } from "../../types"
import { createMold, getMolds, getMoldsByManufacturer, toggleCreateModal } from "../mold/moldActions"
import { defaultMoldSort } from "../mold/moldReducer"
import { defaultPagination } from "../shared/constants"
import { getDropdowns } from "../dropdown/dropdownActions"

const mapState = ({user, mold, dropdowns}: { 
  user: IUsersState,
  mold: IMoldsState,
  dropdowns: IDropdownsState
}) => ({
  loggedIn: user.token,
  molds: mold.molds,
  dropdowns: dropdowns.dropdowns,
  isMoldCreateOpen: mold.isCreateOpen,
  moldSelectedManufacturer: mold.selectedManufacturer,
  moldSort: mold.sort,
  moldPagination: mold.pagination
})

const mapDispatch = {
  getInitialMolds: getMolds(defaultMoldSort, defaultPagination),
  getMolds: (sort: ISort, pagination: IPagination) => getMolds(sort, pagination),
  getDropdowns: getDropdowns(),
  getMoldsByManufacturer: (manufacturerId: number, sort: ISort, pagination: IPagination) => getMoldsByManufacturer(manufacturerId, sort, pagination),
  toggleMoldCreateModal: () => toggleCreateModal(),
  createMold: (mold: TMoldCreate) => createMold(mold),
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export const AdminContainer = (props: PropsFromRedux): JSX.Element => {
  const { loggedIn } = props
  const moldProps = {
    loggedIn,
    molds: props.molds,
    dropdowns: props.dropdowns,
    isMoldCreateOpen: props.isMoldCreateOpen,
    moldSelectedManufacturer: props.moldSelectedManufacturer,
    moldSort: props.moldSort,
    moldPagination: props.moldPagination
  }
  const moldDispatch = {
    getMolds: props.getMolds,
    getMoldsByManufacturer: props.getMoldsByManufacturer,
    toggleMoldCreateModal: props.toggleMoldCreateModal,
    createMold: props.createMold
  }
  const [tab, updateTab] = useState(1)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>Ylläpitäjän näkymä</h1>
      <Tabs value={tab} onChange={(_, newValue) => updateTab(newValue)}>
        <Tab label="Käyttäjät" value={1} />
        <Tab label="Muovit" value={2} />
        <Tab label="Mallit" value={3} />
      </Tabs>
      {tab === 1 && <UserContainer />}
      {tab === 2 && <PlasticsContainer />}
      {tab === 3 && <MoldComponent props={moldProps} dispatch={moldDispatch} />}
      {!loggedIn && <Navigate to="/" />}
    </Box>
  )
}

export default connector(AdminContainer)
