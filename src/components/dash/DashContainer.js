import React from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { GoogleLogin } from "@react-oauth/google"

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
              {props.user.firstName} {props.user.lastName}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">Email</div>
            <div className="col-md-5">{props.user.email}</div>
          </div>
          <div className="row">
            <div className="col-md-2">PDGA numero</div>
            <div className="col-md-5">{props.user.pdgaNumber}</div>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => props.toggleEditModal(props.user)}>
              Muokkaa
            </button>
          </div>
          <h2>Ryhmät</h2>
          <table className="table table-striped">
            <tbody>
                {props.user.groups && props.user.groups.map(g => (
                    <tr key={g.id}>
                        <td>{g.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
      )
    ) : (
      <GoogleLogin
        onSuccess={props.login}
        onError={props.loginError}
        useOneTap
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
  loginError: response => dispatch(googleLoginError(response)),
  toggleEditModal: user => dispatch(toggleEditModal(user)),
  editUser: user => dispatch(requestUpdateMe(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashContainer)
