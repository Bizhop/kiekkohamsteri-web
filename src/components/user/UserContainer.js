import React from "react"
import { path, pathOr, any, propEq } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Box, Tooltip } from "@mui/material"
import EngineeringIcon from "@mui/icons-material/Engineering"
import EditIcon from "@mui/icons-material/Edit"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"

import {
  getUsers,
  toggleEditModal,
  updateUser,
  promoteUser,
  demoteUser
} from "./userActions"
import UserEditModal from "./UserEditModal"

const isAdmin = user => {
  if (!user || !user.roles) return false
  return any(propEq('name', 'ADMIN'))(user.roles)
}

const UserContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <UserEditModal
      isOpen={props.isEditOpen}
      toggleModal={props.toggleEditModal}
      user={props.userInEdit}
      editUser={props.editUser}
      label="Muokkaa käyttäjää"
    />
    <h2>Käyttäjät</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Tunnus</TableCell>
            <TableCell>email</TableCell>
            <TableCell>Etunimi</TableCell>
            <TableCell>Sukunimi</TableCell>
            <TableCell>PDGA numero</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map(p => (
            <User
              key={p.id}
              user={p}
              toggleEditModal={props.toggleEditModal}
              promote={props.promote}
              demote={props.demote}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {!props.loggedIn && <Navigate to="/" />}
  </Box>
)

const User = props => {
  const user = props.user
  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.pdgaNumber}</TableCell>
      <TableCell>{isAdmin(user) && <Tooltip title="Ylläpitäjä"><EngineeringIcon /></Tooltip>}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => props.toggleEditModal(user)}
        >
          Muokkaa
        </Button>
      </TableCell>
      <TableCell>
        {isAdmin(user)
          ? <Button
            variant="contained"
            color="error"
            startIcon={<PersonRemoveIcon />}
            onClick={() => props.demote(user.id)}
          >
            Poista ylläpitäjä
          </Button>
          : <Button
            variant="contained"
            color="secondary"
            startIcon={<PersonAddIcon />}
            onClick={() => props.promote(user.id)}
          >
            Lisää ylläpitäjäksi
          </Button>
        }
      </TableCell>
    </TableRow>
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
