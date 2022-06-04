import React from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import GoogleLogin from "react-google-login"

import { login, googleLoginError, toggleEditModal, requestUpdateMe } from "../user/userActions"
import UserEditModal from "../user/UserEditModal"

const DashContainer = props => (
  <div className="container">
    <UserEditModal
      isOpen={props.isEditOpen}
      toggleModal={props.toggleEditModal}
      user={props.userInEdit}
      editUser={props.editUser}
      fromDash={true}
      label="Muokkaa tietojasi"
    />
    {props.loggedIn ? (
      props.user && (
        <div>
          <h1>Tervetuloa {props.user.username}!</h1>
          <div className="row">
            <div className="col-md-2">Nimi</div>
            <div className="col-md-5">
              {props.user.etunimi} {props.user.sukunimi}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">Email</div>
            <div className="col-md-5">{props.user.email}</div>
          </div>
          <div className="row">
            <div className="col-md-2">PDGA numero</div>
            <div className="col-md-5">{props.user.pdga_num}</div>
          </div>
          <div className="row">
            <div className="col-md-2">Kiekkojen lkm</div>
            <div className="col-md-5">{props.user.discCount}</div>
          </div>
          <div className="row">
            <div className="col-md-2">Näytä lkm</div>
            <div className="col-md-5">{props.user.publicDiscCount ? "Kyllä" : "Ei"}</div>
          </div>
          <div className="row">
            <div className="col-md-2">Julkinen listaus</div>
            <div className="col-md-5">{props.user.publicList ? "Kyllä" : "Ei"}</div>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => props.toggleEditModal(props.user)}>
              Muokkaa
            </button>
          </div>
          <p>Huom! Listauksen julkaiseminen tekee kaikista kiekoistasi myös julkisia</p>
        </div>
      )
    ) : (
      <GoogleLogin
        clientId="107543052765-lfgp4lke6h51a0l4kp258anilpeegf8v.apps.googleusercontent.com"
        buttonText="Kirjaudu sisään"
        className="btn btn-danger"
        onSuccess={props.login}
        onFailure={props.googleLoginError}
      />
    )}
    {props.error && (
      <div>
        {props.error}
      </div>
    )}
  </div>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  user: path(["user", "user"], state),
  error: path(["user", "error"], state),
  isEditOpen: path(["user", "isEditModalOpen"], state),
  userInEdit: path(["user", "userInEdit"], state)
})

const mapDispatchToProps = dispatch => ({
  login: response => dispatch(login(response)),
  loginError: response => dispatch(loginError(response)),
  toggleEditModal: user => dispatch(toggleEditModal(user)),
  editUser: user => dispatch(requestUpdateMe(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashContainer)
