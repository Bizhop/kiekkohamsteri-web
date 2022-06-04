import React from "react"
import { includes, path } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"

import LeaderTable from "./LeaderTable"
import { getLeaders } from "../user/userActions"
import { getJulkiset, laajenna, supista, getLost, found } from "../kiekko/kiekkoActions"
import KiekkoTable from "../kiekko/KiekkoTable"
import { plus, minus } from "../shared/images"
import { defaultSort } from "../shared/text"
import { getStats } from "./muutActions"
import StatsTable from "./StatsTable"

const MuutContainer = props => (
  <div className="container">
    <h1>Kunniataulukko</h1>
    {props.leaders && (
      <div className="row">
        <div className="col-md-6">
          <LeaderTable leaders={props.leaders} />
        </div>
      </div>
    )}
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
    <h1>Julkiset listat</h1>
    {props.julkiset ? (
      props.julkiset.map(j => (
        <Julkiset
          lista={j}
          key={j.username}
          julkisetVisible={props.julkisetVisible}
          laajenna={props.laajenna}
          supista={props.supista}
          updateKiekot={props.updateKiekot}
          sortColumn={props.sortColumn}
        />
      ))
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

const Julkiset = props => (
  <div className="row">
    <div className="col-md-12">
      <h2>{props.lista.username}</h2>
      {!includes(props.lista.username, props.julkisetVisible) ? (
        <img
          src={plus}
          alt="laajenna"
          height="30"
          width="30"
          onClick={() => props.laajenna(props.lista.username)}
        />
      ) : (
        <div>
          <img
            src={minus}
            alt="supista"
            height="30"
            width="30"
            onClick={() => props.supista(props.lista.username)}
          />
          <KiekkoTable
            kiekot={props.lista.kiekot}
            editable={false}
            updateKiekot={props.updateKiekot}
            sortColumn={props.sortColumn}
          />
        </div>
      )}
    </div>
  </div>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  username: path(["user", "user", "username"], state),
  leaders: path(["user", "leaders"], state),
  julkiset: path(["kiekko", "julkiset"], state),
  julkisetVisible: path(["kiekko", "julkisetVisible"], state),
  sortColumn: path(["kiekko", "sortColumn"], state),
  statsSortColumn: path(["muut", "sortColumn"], state),
  stats: path(["muut", "stats"], state),
  lost: path(["kiekko", "lost"], state),
  lostSortColumn: path(["kiekko", "lostSortColumn"], state)
})

const mapDispatchToProps = dispatch => ({
  getLeaders: dispatch(getLeaders()),
  getJulkiset: dispatch(getJulkiset(defaultSort)),
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
  laajenna: username => dispatch(laajenna(username)),
  supista: username => dispatch(supista(username)),
  updateKiekot: params => dispatch(getJulkiset(params)),
  updateLost: params => dispatch(getLost(params)),
  updateStats: params => dispatch(getStats(params)),
  found: id => dispatch(found(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MuutContainer)
