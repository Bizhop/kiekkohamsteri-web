import React from "react"
import { useLocation } from "react-router-dom"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { path } from "ramda"
import { Box } from "@mui/material"

import { defaultSort, defaultPagination } from "../shared/constants"
import { getOtherUserDiscs } from "../discs/discsActions"
import DiscsTable from "../discs/DiscsTable"

const OneUserContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <h1>{props.otherUserName}</h1>
    {props.otherUserDiscs ? (
      <DiscsTable
        discs={props.discs}
        search={props.search}
        userId={getUserId()}
        editable={false}
        sort={props.sort}
        pagination={props.pagination}
        filters={[]}
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
  discs: path(["discs", "discs"], state),
  otherUserDiscs: path(["discs", "otherUserDiscs"], state),
  otherUserName: path(["discs", "otherUserName"], state),
  pagination: path(["discs", "pagination"], state),
  sort: path(["discs", "sort"], state),
})

const mapDispatchToProps = dispatch => ({
  getDiscs: userId =>
    dispatch(getOtherUserDiscs({ sort: defaultSort, pagination: defaultPagination, userId })),
  search: params => dispatch(getOtherUserDiscs(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneUserContainer)
