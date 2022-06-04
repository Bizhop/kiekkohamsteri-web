import React from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

import { getKiekko } from "./kiekkoActions"
import { imageUrl, check } from "../shared/images"
import { tussit } from "../shared/text"

const YksiKiekkoContainer = props => (
  <div className="container">
    {!props.loggedIn && <Navigate to="/" />}
    {props.kiekko ? (
      <div>
        <h1>
          {props.kiekko.valmistaja} {props.kiekko.muovi} {props.kiekko.mold} ({props.kiekko.vari})
        </h1>
        <div className="row">
          <div className="col-md-6">
            <img alt="" src={`${imageUrl}t_kiekko/${props.kiekko.kuva}`} className="image100" />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-3">Id</div>
              <div className="col-md-9">{props.kiekko.id}</div>
            </div>
            <div className="row">
              <div className="col-md-3">Omistaja</div>
              <div className="col-md-9">{props.kiekko.omistaja}</div>
            </div>
            <div className="row">
              <div className="col-md-3">Lentoarvot</div>
              <div className="col-md-9">
                {props.kiekko.nopeus} / {props.kiekko.liito} / {props.kiekko.vakaus} /{" "}
                {props.kiekko.feidi}
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">Kunto</div>
              <div className="col-md-9">{props.kiekko.kunto} / 10</div>
            </div>
            <div className="row">
              <div className="col-md-3">Tussit</div>
              <div className="col-md-9">{tussit[props.kiekko.tussit - 1]}</div>
            </div>
            <div className="row">
              <div className="col-md-3">Paino</div>
              <div className="col-md-9">{props.kiekko.paino}</div>
            </div>
            <div className="row">
              <div className="col-md-3">Muuta</div>
              <div className="col-md-9">{props.kiekko.muuta}</div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <table className="table table-striped custom-table">
                  <thead>
                    <tr>
                      <th>Dyed</th>
                      <th>Hohto</th>
                      <th>Swirly</th>
                      <th>Spessu</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {props.kiekko.dyed ? <img className="on-table" src={check} alt="" /> : ""}
                      </td>
                      <td>
                        {props.kiekko.hohto ? <img className="on-table" src={check} alt="" /> : ""}
                      </td>
                      <td>
                        {props.kiekko.swirly ? <img className="on-table" src={check} alt="" /> : ""}
                      </td>
                      <td>
                        {props.kiekko.spessu ? <img className="on-table" src={check} alt="" /> : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <h1>{props.oneDiscText}</h1>
    )}
  </div>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  kiekko: path(["kiekko", "kiekko"], state),
  oneDiscText: path(["kiekko", "oneDiscText"], state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const kiekkoId = path(["match", "params", "id"], ownProps)
  return {
    getKiekko: dispatch(getKiekko(kiekkoId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YksiKiekkoContainer)
