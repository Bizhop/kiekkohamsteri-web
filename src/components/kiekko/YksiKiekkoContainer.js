import React from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"

import { getKiekko } from "./kiekkoActions"
import { imageUrl } from "../shared/images"
import { tussit } from "../shared/text"

const YksiKiekkoContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    {props.kiekko ? (
      <div>
        <h1>
          {props.kiekko.valmistaja} {props.kiekko.muovi} {props.kiekko.mold} ({props.kiekko.vari})
        </h1>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <img src={`${imageUrl}t_kiekko/${props.kiekko.kuva}`} className="image100" />
          </Grid>
          <Grid item md={6}>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Id</strong>
              </Grid>
              <Grid item md={9}>
                {props.kiekko.id}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Omistaja</strong>
              </Grid>
              <Grid item md={9}>
                {props.kiekko.omistaja}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Lentoarvot</strong>
              </Grid>
              <Grid item md={9}>
                {props.kiekko.nopeus} / {props.kiekko.liito} / {props.kiekko.vakaus} /{" "}
                {props.kiekko.feidi}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Kunto</strong>
              </Grid>
              <Grid item md={9}>
                {props.kiekko.kunto} / 10
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Tussit</strong>
              </Grid>
              <Grid item md={9}>
                {tussit[props.kiekko.tussit - 1]}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Paino</strong>
              </Grid>
              <Grid item md={9}>
                {props.kiekko.paino}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Muuta</strong>
              </Grid>
              <Grid item md={9}>
                {props.kiekko.muuta}
              </Grid>
            </Grid>
            <Grid container spacing={1} marginTop={1}>
              <Grid item md={3}>
                <strong>Dyed</strong>
              </Grid>
              <Grid item md={3}>
                <strong>Hohto</strong>
              </Grid>
              <Grid item md={3}>
                <strong>Swirly</strong>
              </Grid>
              <Grid item md={3}>
                <strong>Spessu</strong>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                {props.kiekko.dyed && <CircleIcon />}
              </Grid>
              <Grid item md={3}>
                {props.kiekko.hohto && <CircleIcon />}
              </Grid>
              <Grid item md={3}>
                {props.kiekko.swirly && <CircleIcon />}
              </Grid>
              <Grid item md={3}>
                {props.kiekko.spessu && <CircleIcon />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    ) : (
      getDiscIdAndDisc(props.getDisc)
    )}
    {!props.loggedIn && <Navigate to="/" />}
  </Box>
)

function getDiscIdAndDisc(getDisc) {
  const location = useLocation()
  const id = location.pathname.split("/").pop()
  getDisc(id)
}

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  kiekko: path(["kiekko", "kiekko"], state),
  oneDiscText: path(["kiekko", "oneDiscText"], state),
})

const mapDispatchToProps = dispatch => ({
  getDisc: id => dispatch(getKiekko(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(YksiKiekkoContainer)
