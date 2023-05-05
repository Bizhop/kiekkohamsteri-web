import React, { useState } from "react"
import { ConnectedProps, connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Box, Tab, Tabs } from "@mui/material"

import UserContainer from "../user/UserContainer"
import MoldContainer from "../mold/MoldContainer"
import PlasticsContainer from "../plastics/PlasticsContainer"
import { IUsersState } from "../../types"

const mapState = ({user}: { user: IUsersState }) => ({
  loggedIn: user.token,
})

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>

export const AdminContainer = (props: PropsFromRedux): JSX.Element => {
  const { loggedIn } = props
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
      {tab === 3 && <MoldContainer />}
      {!loggedIn && <Navigate to="/" />}
    </Box>
  )
}

export default connector(AdminContainer)
