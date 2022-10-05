import React from "react"
import { path, pathOr } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Box } from "@mui/material"

import { getMyytavat } from "./myytavatActions"
import { buyDisc, getOmat, peruutaOsto, hyvaksyOsto } from "../osto/ostoActions"
import MyytavatTable from "./MyytavatTable"
import OstoTable from "./OstoTable"
import MyyntiTable from "./MyyntiTable"

const MyytavatContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <h1>Omat ostot</h1>
    {props.kaupat && (
      <OstoTable
        ostot={props.kaupat.ostajana}
        action={{ action: props.peruuta, label: "Peruuta" }}
      />
    )}
    <h1>Omat myynnit</h1>
    {props.kaupat && (
      <MyyntiTable
        myynnit={props.kaupat.myyjana}
        accept={{ action: props.accept, label: "Hyväksy" }}
        cancel={{ action: props.peruuta, label: "Peruuta" }}
      />
    )}
    <h1>Myytävät</h1>
    {!props.loggedIn && <Navigate to="/" />}
    <MyytavatTable
      updateMyytavat={props.updateMyytavat}
      sortColumn={props.sortColumn}
      kiekot={props.kiekot}
      action={{
        action: props.buyDisc,
        label: "Osta"
      }}
      username={props.username}
    />
  </Box>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  username: path(["user", "user", "username"], state),
  kiekot: pathOr([], ["myytavat", "kiekot"], state),
  sortColumn: path(["myytavat", "sortColumn"], state),
  kaupat: path(["osto", "data"], state)
})

const mapDispatchToProps = dispatch => ({
  getMyytavat: dispatch(
    getMyytavat({
      sort: "id,asc",
      newSortColumn: "Id"
    })
  ),
  getOstot: dispatch(getOmat()),
  updateMyytavat: params => dispatch(getMyytavat(params)),
  buyDisc: id => dispatch(buyDisc(id)),
  accept: id => dispatch(hyvaksyOsto(id)),
  peruuta: id => dispatch(peruutaOsto(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyytavatContainer)
