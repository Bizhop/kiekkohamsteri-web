import React from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"

import { getLost, found } from "../kiekko/kiekkoActions"
import KiekkoTable from "../kiekko/KiekkoTable"
import { getStats } from "./muutActions"
import StatsTable from "./StatsTable"

const MuutContainer = props => (
  <div className="container">
    <h1>Statistiikat</h1>
    {props.stats ? (
      <div className="row">
        <div className="col-md-6">
          <StatsTable
            stats={props.stats}
            sortColumn={props.statsSortColumn}
            update={props.updateStats}
          />
        </div>
      </div>
    ) : (
      <Spinner />
    )}
    <h1>Kadonneet</h1>
    {props.lost ? (
      <KiekkoTable
        kiekot={props.lost}
        editable={false}
        lostDiscs={true}
        updateKiekot={props.updateLost}
        sortColumn={props.lostSortColumn}
        username={props.username}
        found={props.found}
      />
    ) : (
      <Spinner />
    )}
    {!props.loggedIn && <Navigate to="/" />}
  </div>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  username: path(["user", "user", "username"], state),
  statsSortColumn: path(["muut", "sortColumn"], state),
  stats: path(["muut", "stats"], state),
  lost: path(["kiekko", "lost"], state),
  lostSortColumn: path(["kiekko", "lostSortColumn"], state)
})

const mapDispatchToProps = dispatch => ({
  getStats: dispatch(
    getStats({
      sort: "year,desc&sort=month,desc",
      newSortColumn: "Kuukausi"
    })
  ),
  getLost: dispatch(
    getLost({
      sort: "updatedAt,desc",
      newSortColumn: "Pvm"
    })
  ),
  updateLost: params => dispatch(getLost(params)),
  updateStats: params => dispatch(getStats(params)),
  found: id => dispatch(found(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MuutContainer)
