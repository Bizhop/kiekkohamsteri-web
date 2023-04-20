import React from "react"
import { path, any, propEq, pick } from "ramda"
import { ConnectedProps, connect } from "react-redux"
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { Spinner } from "react-activity"
import {
  Box,
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Tooltip,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import GroupRemoveIcon from "@mui/icons-material/GroupRemove"
import EngineeringIcon from "@mui/icons-material/Engineering"

import { login, googleLoginError, toggleEditModal, updateUser } from "../user/userActions"
import { getGroupUsers, resetGroupUsers } from "../group/groupActions"
import { promote, demote, kick } from "../group/groupActions"
import UserEditModal from "../user/UserEditModal"
import GroupUsersTable from "../group/GroupUsersTable"
import { IGroupsState, IUsersState, TGroup, TUser, TUserUpdate } from "../../types"

interface GroupUser {
  userId: number,
  groupId: number
}

const isGroupAdmin = ({ user, groupId }: { user: TUser | null, groupId: number }) => {
  if (!user || !groupId || !user.roles) return false
  return any(propEq("name", "GROUP_ADMIN") && propEq("groupId", groupId))(user.roles)
}

const mapState = ({ user, group }: { user: IUsersState, group: IGroupsState }) => ({
  loggedIn: user.token,
  user: user.user,
  isEditOpen: user.isEditModalOpen,
  userInEdit: user.userInEdit,
  users: group.users,
  fetchingUsers: group.fetchingUsers,
  selectedGroup: group.selectedGroup,
})

const mapDispatch = {
  resetGroupUsers: resetGroupUsers(),
  login: (response: CredentialResponse) => login(response),
  loginError: () => googleLoginError(),
  toggleEditModal: (user: TUser | null) => toggleEditModal(user),
  editUser: (id: number, user: TUserUpdate) => updateUser(id, user),
  listUsers: (group: TGroup) => getGroupUsers(group),
  promote: (groupUser: GroupUser) => promote(groupUser.userId, groupUser.groupId),
  demote: (groupUser: GroupUser) => demote(groupUser.userId, groupUser.groupId),
  kick: (groupUser: GroupUser) => kick(groupUser.userId, groupUser.groupId),
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const DashContainer = (props: PropsFromRedux) => {
  const handleEditUser = (user: TUser) => props.editUser(user.id, pick(["username", "firstName", "lastName", "pdgaNumber"], user))

  return (
  <div>
    <UserEditModal
      isOpen={props.isEditOpen}
      toggleModal={props.toggleEditModal}
      user={props.userInEdit}
      editUser={handleEditUser}
      label="Muokkaa tietojasi"
    />
    {props.loggedIn ? (
      props.user && (
        <Box sx={{ flexGrow: 1 }}>
          <h1>Tervetuloa {props.user.username}!</h1>
          <Grid container spacing={1}>
            <Grid item md={2}>
              <strong>Nimi</strong>
            </Grid>
            <Grid item md={5}>
              {props.user.firstName} {props.user.lastName}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={2}>
              <strong>Email</strong>
            </Grid>
            <Grid item md={5}>
              {props.user.email}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={2}>
              <strong>PDGA numero</strong>
            </Grid>
            <Grid item md={5}>
              {props.user.pdgaNumber}
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item md={2}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => props.toggleEditModal(props.user)}
              >
                Muokkaa
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={3}>
            <Grid item md={6}>
              <TableContainer component={Paper} elevation={3}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <strong>Ryhmät</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.user.groups &&
                      props.user.groups.map(g => (
                        <TableRow
                          key={g.id}
                          onClick={() => props.listUsers(g)}
                          className="color-on-hover"
                        >
                          <TableCell>{g.name}</TableCell>
                          <TableCell>
                            {isGroupAdmin({ user: props.user, groupId: g.id }) && (
                              <Tooltip title="Ylläpitäjä">
                                <EngineeringIcon />
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              startIcon={<GroupRemoveIcon />}
                              onClick={() => handleLeavingGroup(props.editUser, props.user ? props.user.id : -1, g.id)}
                            >
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
              {props.fetchingUsers ? (
                <Spinner />
              ) : (
                <GroupUsersTable
                  users={props.users}
                  group={props.selectedGroup}
                  promote={props.promote}
                  demote={props.demote}
                  kick={props.kick}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      )
    ) : (
      <GoogleLogin onSuccess={props.login} onError={props.loginError} useOneTap />
    )}
  </div>
)}

const handleLeavingGroup = (editUser: typeof updateUser, userId: number, removeFromGroupId: number) => {
  confirmAlert({
    title: "Varoitus",
    message: "Haluatko varmasti poistua ryhmästä?",
    buttons: [
      {
        label: "Poistu",
        onClick: () => editUser(userId, { removeFromGroupId }),
        className: "red-button",
      },
      {
        label: "Peruuta",
      },
    ],
  })
}

export default connector(DashContainer)
