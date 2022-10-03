import React from "react"
import { path, any, propEq } from "ramda"
import { connect } from "react-redux"
import { GoogleLogin } from "@react-oauth/google"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { Box, Grid, Button, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import GroupRemoveIcon from "@mui/icons-material/GroupRemove"

import { login, googleLoginError, toggleEditModal, requestUpdateMe } from "../user/userActions"
import UserEditModal from "../user/UserEditModal"
import { admin } from "../shared/images"

const isGroupAdmin = ({ user, groupId }) => {
  if (!user || !groupId || !user.roles) return false
  return any(propEq('name', 'GROUP_ADMIN') && propEq('groupId', groupId))(user.roles)
}

const DashContainer = props => (
  <div>
    <UserEditModal
      isOpen={props.isEditOpen}
      toggleModal={props.toggleEditModal}
      user={props.userInEdit}
      editUser={props.editUser}
      label="Muokkaa tietojasi"
    />
    {props.loggedIn ? (
      props.user && (
        <Box sx={{ flexGrow: 1 }}>
          <h1>Tervetuloa {props.user.username}!</h1>
          <Grid container spacing={1}>
            <Grid item md={2}>Nimi</Grid>
            <Grid item md={5}>
              {props.user.firstName} {props.user.lastName}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={2}>Email</Grid>
            <Grid item md={5}>{props.user.email}</Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={2}>PDGA numero</Grid>
            <Grid item md={5}>{props.user.pdgaNumber}</Grid>
          </Grid>
          <Button variant="contained" startIcon={<EditIcon />} onClick={() => props.toggleEditModal(props.user)}>
            Muokkaa
          </Button>
          <h2>Ryhmät</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {props.user.groups && props.user.groups.map(g => (
                  <TableRow key={g.id}>
                    <TableCell>{g.name}</TableCell>
                    <TableCell>
                      {isGroupAdmin({ user: props.user, groupId: g.id }) &&
                        <img src={admin} title="Ylläpitäjä" />
                      }
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<GroupRemoveIcon />}
                        onClick={() => handleLeavingGroup({ confirm: props.editUser, data: { id: props.user.id, removeFromGroupId: g.id } })}>
                        Poistu ryhmästä
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )
    ) : (
      <GoogleLogin
        onSuccess={props.login}
        onError={props.loginError}
        useOneTap
      />
    )}
  </div>
)

const handleLeavingGroup = params => {
  confirmAlert({
    title: "Varoitus",
    message: "Haluatko varmasti poistua ryhmästä?",
    buttons: [
      {
        label: "Poistu",
        onClick: () => params.confirm(params.data),
        className: "red-button"
      },
      {
        label: "Peruuta"
      }
    ]
  })
}

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  user: path(["user", "user"], state),
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
