import React from "react"
import { path, any, propEq } from "ramda"
import { connect } from "react-redux"
import { GoogleLogin } from "@react-oauth/google"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { Spinner } from "react-activity"
import { Box, Grid, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Tooltip } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import GroupRemoveIcon from "@mui/icons-material/GroupRemove"
import EngineeringIcon from "@mui/icons-material/Engineering"

import { login, googleLoginError, toggleEditModal, requestUpdateMe } from "../user/userActions"
import { getGroupUsers, resetGroupUsers } from "../group/groupActions"
import { promote, demote, kick } from "../group/groupActions"
import UserEditModal from "../user/UserEditModal"
import GroupUsersTable from "../group/GroupUsersTable"

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
            <Grid item md={2}><strong>Nimi</strong></Grid>
            <Grid item md={5}>
              {props.user.firstName} {props.user.lastName}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={2}><strong>Email</strong></Grid>
            <Grid item md={5}>{props.user.email}</Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={2}><strong>PDGA numero</strong></Grid>
            <Grid item md={5}>{props.user.pdgaNumber}</Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={2}>
              <Button variant="contained" startIcon={<EditIcon />} onClick={() => props.toggleEditModal(props.user)}>
                Muokkaa
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableCell colSpan={3}>
                      <strong>Ryhmät</strong>
                    </TableCell>
                  </TableHead>
                  <TableBody>
                    {props.user.groups && props.user.groups.map(g => (
                      <TableRow
                        key={g.id}
                        onClick={() => props.listUsers(g.id)}
                        className="color-on-hover"
                      >
                        <TableCell>{g.name}</TableCell>
                        <TableCell>
                          {isGroupAdmin({ user: props.user, groupId: g.id }) &&
                            <Tooltip title="Ylläpitäjä">
                              <EngineeringIcon />
                            </Tooltip>
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
            </Grid>
            <Grid item md={6}>
              {props.fetchingUsers
                ? <Spinner />
                : <GroupUsersTable
                  users={props.users}
                  group={props.selectedGroup}
                  promote={props.promote}
                  demote={props.demote}
                  kick={props.kick} />}
            </Grid>
          </Grid>
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
  userInEdit: path(["user", "userInEdit"], state),
  users: path(["group", "users"], state),
  fetchingUsers: path(["group", "fetchingUsers"], state),
  selectedGroup: path(["group", "selectedGroup"], state),
})

const mapDispatchToProps = dispatch => ({
  resetGroupUsers: dispatch(resetGroupUsers()),
  login: response => dispatch(login(response)),
  loginError: response => dispatch(googleLoginError(response)),
  toggleEditModal: user => dispatch(toggleEditModal(user)),
  editUser: user => dispatch(requestUpdateMe(user)),
  listUsers: groupId => dispatch(getGroupUsers(groupId)),
  promote: params => dispatch(promote(params)),
  demote: params => dispatch(demote(params)),
  kick: params => dispatch(kick(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashContainer)
