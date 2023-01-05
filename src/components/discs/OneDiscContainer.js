import React from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"

import { getDisc } from "./discsActions"
import { imageUrl } from "../shared/images"
import { markings } from "../shared/constants"

const OneDiscContainer = ({ loggedIn, disc, oneDiscText, getDisc }) => (
  <Box sx={{ flexGrow: 1 }}>
    {oneDiscText && <h1>{oneDiscText}</h1>}
    {disc && (
      <div>
        <h1>
          {disc.mold.manufacturer.name} {disc.plastic.name} {disc.mold.name} ({disc.color.name})
        </h1>
        <Grid container spacing={1}>
          <Grid item md={6}>
            <img src={`${imageUrl}t_kiekko/${disc.image}`} className="image100" />
          </Grid>
          <Grid item md={6}>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Id</strong>
              </Grid>
              <Grid item md={9}>
                {disc.id}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Omistaja</strong>
              </Grid>
              <Grid item md={9}>
                {disc.owner.username}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Lentoarvot</strong>
              </Grid>
              <Grid item md={9}>
                {disc.mold.speed} / {disc.mold.glide} / {disc.mold.stability} /{" "}
                {disc.mold.fade}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Kunto</strong>
              </Grid>
              <Grid item md={9}>
                {disc.condition} / 10
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Tussit</strong>
              </Grid>
              <Grid item md={9}>
                {markings[disc.markings - 1]}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Paino</strong>
              </Grid>
              <Grid item md={9}>
                {disc.weight}
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <strong>Muuta</strong>
              </Grid>
              <Grid item md={9}>
                {disc.description}
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
                {disc.dyed && <CircleIcon />}
              </Grid>
              <Grid item md={3}>
                {disc.glow && <CircleIcon />}
              </Grid>
              <Grid item md={3}>
                {disc.swirly && <CircleIcon />}
              </Grid>
              <Grid item md={3}>
                {disc.special && <CircleIcon />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )}
    {!disc && !oneDiscText && getDiscIdAndDisc(getDisc)}
    {!loggedIn && <Navigate to="/" />}
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
  disc: path(["discs", "kiekko"], state),
  oneDiscText: path(["discs", "oneDiscText"], state),
})

const mapDispatchToProps = dispatch => ({
  getDisc: id => dispatch(getDisc(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OneDiscContainer)
