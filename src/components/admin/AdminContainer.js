import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { path } from "ramda"
import { Box, Tab, Tabs } from "@mui/material"

import { changeView } from "./adminActions"
import UserContainer from "../user/UserContainer"
import MoldContainer from "../mold/MoldContainer"
import MuoviContainer from "../muovi/MuoviContainer"

const isAdmin = user => {
  if (!user || !user.roles) return false
  return any(propEq("name", "ADMIN"))(user.roles)
}

const AdminContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <h1>Ylläpitäjän näkymä</h1>
    <Tabs value={props.tab} onChange={props.changeView}>
      <Tab label="Käyttäjät" value="1" />
      <Tab label="Muovit" value="2" />
      <Tab label="Moldit" value="3" />
    </Tabs>
    {!props.loggedIn && <Navigate to="/" />}
    {props.tab === "1" && <UserContainer />}
    {props.tab === "2" && <MuoviContainer />}
    {props.tab === "3" && <MoldContainer />}
  </Box>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  tab: path(["admin", "tab"], state),
})

const mapDispatchToProps = dispatch => ({
  changeView: (_, newValue) => dispatch(changeView(newValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
