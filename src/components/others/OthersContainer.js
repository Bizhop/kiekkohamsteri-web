import React from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import { Box } from "@mui/material"

import { getLost, found } from "../discs/discsActions"
import DiscsTable from "../discs/DiscsTable"
import { getStats } from "./othersActions"
import StatsTable from "./StatsTable"
import { defaultPagination } from "../shared/constants"

const OthersContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <h1>Kadonneet</h1>
    {props.lost ? (
      <DiscsTable
        kiekot={props.lost}
        editable={false}
        lostDiscs={true}
        search={props.updateLost}
        username={props.username}
        found={props.found}
        sort={props.lostSort}
        pagination={props.lostPagination}
        filters={[]}
      />
    ) : (
      <Spinner />
    )}
    <h1>Statistiikat</h1>
    {props.stats ? (
      <StatsTable stats={props.stats} update={props.updateStats} sort={props.statsSort} />
    ) : (
      <Spinner />
    )}
    {!props.loggedIn && <Navigate to="/" />}
  </Box>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  username: path(["user", "user", "username"], state),
  statsSort: path(["others", "statsSort"], state),
  stats: path(["others", "stats"], state),
  lost: path(["discs", "lost"], state),
  lostSort: path(["discs", "lostSort"], state),
  lostPagination: path(["discs", "lostPagination"], state),
})

const mapDispatchToProps = dispatch => ({
  getStats: dispatch(
    getStats({
      sort: {
        sort: "year,desc&sort=month,desc",
        column: "Kuukausi",
      },
    })
  ),
  getLost: dispatch(
    getLost({
      sort: {
        sort: "updatedAt,desc",
        column: "Pvm",
      },
      pagination: { ...defaultPagination, size: 1000 },
    })
  ),
  updateLost: params => dispatch(getLost(params)),
  updateStats: params => dispatch(getStats(params)),
  found: id => dispatch(found(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OthersContainer)
