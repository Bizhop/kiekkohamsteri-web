import React from "react"
import { path, pathOr } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"

import { getRating, getCustomRating, initRating } from "./ratingActions"
import RoundsForm from "./RoundsForm"

const RatingContainer = props => (
  <div className="container">
    <h1>Rating-laskuri</h1>
    <div className="row">
      <div className="col-md-2">
        <button
          className="btn btn-primary btn-block"
          onClick={() => props.getRating(props.user.pdgaNumber)}
        >
          Hae kierrokset
        </button>
      </div>
      {props.nextRating && (
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-6">
              <strong>Laskettu rating</strong>
            </div>
            <div className="col-md-6">{props.nextRating}</div>
          </div>
        </div>
      )}
    </div>

    {props.error && (
      <div className="row rating">
        <div className="col-md-4">
          <div className="alert alert-danger">{props.error}</div>
        </div>
      </div>
    )}

    {props.fetching && <Spinner />}
    {props.nextRating && (
      <div>
        <RoundsForm
          onSubmit={props.getCustomRating}
          initialValues={props.rating}
          roundsValues={props.roundsValues}
          customRating={props.customRating}
        />
      </div>
    )}

    {!props.loggedIn && <Navigate to="/" />}
  </div>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  user: path(["user", "user"], state),
  error: path(["rating", "error"], state),
  nextRating: path(["rating", "nextRating"], state),
  customRating: path(["rating", "customRating"], state),
  rating: pathOr({}, ["rating"], state),
  fetching: path(["rating", "fetching"], state),
  roundsValues: pathOr({}, ["form", "roundsForm", "values"], state),
})

const mapDispatchToProps = dispatch => ({
  init: dispatch(initRating()),
  getRating: pdga => dispatch(getRating(pdga)),
  getCustomRating: form => dispatch(getCustomRating(form)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RatingContainer)
