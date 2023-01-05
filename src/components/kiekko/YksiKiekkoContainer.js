import React from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"

import { getKiekko } from "./kiekkoActions"
import { imageUrl } from "../shared/images"
import { markings } from "../shared/constants"

const YksiKiekkoContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    {props.oneDiscText && <h1>{props.oneDiscText}</h1>}
    {props.kiekko && (
      <div>
        <h1>
          {props.kiekko.mold.manufacturer.name} {props.kiekko.plastic.name} {props.kiekko.mold.name} ({props.kiekko.color.name})
        </h1>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <img src={`${imageUrl}t_kiekko/${props.kiekko.image}`} className="image100" />
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
                {props.kiekko.owner.username}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Lentoarvot</strong>
              </Grid>
              <Grid item md={9}>
                {props.kiekko.mold.speed} / {props.kiekko.mold.glide} / {props.kiekko.mold.stability} /{" "}
                {props.kiekko.mold.fade}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Kunto</strong>
              </Grid>
              <Grid item md={9}>
                {props.kiekko.condition} / 10
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Tussit</strong>
              </Grid>
              <Grid item md={9}>
                {markings[props.kiekko.markings - 1]}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Paino</strong>
              </Grid>
              <Grid item md={9}>
                {props.kiekko.weight}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Muuta</strong>
              </Grid>
              <Grid item md={9}>
                {props.kiekko.description}
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
                {props.kiekko.glow && <CircleIcon />}
              </Grid>
              <Grid item md={3}>
                {props.kiekko.swirly && <CircleIcon />}
              </Grid>
              <Grid item md={3}>
                {props.kiekko.special && <CircleIcon />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )}
    {!props.kiekko && !props.oneDiscText && getDiscIdAndDisc(props.getDisc)}
    {!props.loggedIn && <Navigate to="/" />}
  </Box>
)

function getDiscIdAndDisc(getDisc) {
  const location = useLocation()
  const id = location.pathname.split("/").pop()
  getDisc(id)
  return null
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
