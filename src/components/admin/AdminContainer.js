import React, { useState } from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { path } from "ramda"
import { Box, Tab, Tabs } from "@mui/material"

import UserContainer from "../user/UserContainer"
import MoldContainer from "../mold/MoldContainer"
import PlasticsContainer from "../plastics/PlasticsContainer"

const AdminContainer = props => {
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
      {!props.loggedIn && <Navigate to="/" />}
    </Box>
  )
}

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
})

export default connect(mapStateToProps)(AdminContainer)
