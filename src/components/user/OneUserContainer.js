import React from "react"
import { useLocation } from "react-router-dom"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { path } from "ramda"
import { Box } from "@mui/material"

import { defaultSort, defaultPagination } from "../shared/constants"
import { getOtherUserDiscs } from "../discs/discsActions"
import KiekkoTable from "../discs/DiscsTable"

const OneUserContainer = props => {
  const { sort, pagination, filters } = props

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>{props.otherUserName}</h1>
      {props.otherUserDiscs ? (
        <KiekkoTable
          kiekot={props.discs}
          search={props.search}
          userId={getUserId()}
          editable={false}
          sort={sort}
          pagination={pagination}
          filters={filters}
        />
      ) : (
        getUserIdAndDiscs(props.getDiscs)
      )}
      {!props.loggedIn && <Navigate to="/" />}
    </Box>
  )
}

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
  otherUserDiscs: path(["kiekko", "otherUserDiscs"], state),
  otherUserName: path(["kiekko", "otherUserName"], state),
  pagination: path(["kiekko", "pagination"], state),
  sort: path(["kiekko", "sort"], state),
  filters: path(["kiekko", "filters"], state),
})

const mapDispatchToProps = dispatch => ({
  getDiscs: userId =>
    dispatch(getOtherUserDiscs({ sort: defaultSort, pagination: defaultPagination, userId })),
  search: params => dispatch(getOtherUserDiscs(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneUserContainer)
