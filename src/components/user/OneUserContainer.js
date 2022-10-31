import React from "react"
import { useLocation } from "react-router-dom"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { path } from "ramda"
import { Box } from "@mui/material"

import { defaultSort } from "../shared/text"
import { getOtherUserDiscs } from "../kiekko/kiekkoActions"
import KiekkoTable from "../kiekko/KiekkoTable"

const OneUserContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <h1>{props.otherUserName}</h1>
    {props.otherUserDiscs ? (
      <KiekkoTable
        kiekot={props.discs}
        sortColumn={props.sortColumn}
        updateKiekot={props.updateDiscs}
        userId={getUserId()}
        editable={false}
      />
    ) : (
      getUserIdAndDiscs(props.getDiscs)
    )}
    {!props.loggedIn && <Navigate to="/" />}
  </Box>
)

function getUserIdAndDiscs(getDiscs) {
  getDiscs(getUserId())
}

function getUserId() {
  const location = useLocation()
  return location.pathname.split("/").pop()
}

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  discs: path(["kiekko", "kiekot"], state),
  sortColumn: path(["kiekko", "sortColumn"], state),
  otherUserDiscs: path(["kiekko", "otherUserDiscs"], state),
  otherUserName: path(["kiekko", "otherUserName"], state),
})

const mapDispatchToProps = dispatch => ({
  getDiscs: userId => dispatch(getOtherUserDiscs({ ...defaultSort, userId })),
  updateDiscs: params => dispatch(getOtherUserDiscs(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneUserContainer)
