import React from "react"
import { path, pathOr } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

import {
  getUsers,
  toggleEditModal,
  updateUser,
  promoteUser,
  demoteUser
} from "./userActions"
import UserEditModal from "./UserEditModal"

const UserContainer = props => (
  <div className="container">
    <UserEditModal
      isOpen={props.isEditOpen}
      toggleModal={props.toggleEditModal}
      user={props.userInEdit}
      editUser={props.editUser}
      fromDash={false}
      label="Muokkaa käyttäjää"
    />
    <h1>Käyttäjät</h1>
    <table className="table table-striped custom-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Tunnus</th>
          <th>email</th>
          <th>Etunimi</th>
          <th>Sukunimi</th>
          <th>PDGA numero</th>
          <th>Kiekkoja</th>
          <th>Oikeudet</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {props.users.map(p => (
          <User
            key={p.id}
            user={p}
            toggleEditModal={props.toggleEditModal}
            promote={props.promote}
            demote={props.demote}
          />
        ))}
      </tbody>
    </table>
    {!props.loggedIn && <Navigate to="/" />}
  </div>
)

const User = props => {
  const user = props.user
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.etunimi}</td>
      <td>{user.sukunimi}</td>
      <td>{user.pdga_num}</td>
      <td>{user.discCount}</td>
      <td>{user.level}</td>
      <td>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => props.toggleEditModal(user)}>
            Muokkaa
          </button>
        </div>
      </td>
      <td>
        <div className="btn-group">
          {user.level === 1 ? (
            <button className="btn btn-success" onClick={() => props.promote(user.id)}>
              Lisää admin
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => props.demote(user.id)}>
              Poista admin
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  users: pathOr([], ["user", "users"], state),
  isEditOpen: path(["user", "isEditModalOpen"], state),
  userInEdit: path(["user", "userInEdit"], state)
})

const mapDispatchToProps = dispatch => ({
  getUsers: dispatch(getUsers()),
  toggleEditModal: user => dispatch(toggleEditModal(user)),
  editUser: user => dispatch(updateUser(user)),
  promote: userId => dispatch(promoteUser(userId)),
  demote: userId => dispatch(demoteUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
