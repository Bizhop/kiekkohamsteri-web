import React from "react"
import { any, propEq, pick } from "ramda"
import { ConnectedProps, connect } from "react-redux"
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Tooltip,
  Stack,
  Grid,
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
import { isGroupAdmin } from "../shared/utils"

interface GroupUser {
  userId: number,
  groupId: number
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

export const DashContainer = (props: PropsFromRedux): JSX.Element => {
  const { editUser, isEditOpen, userInEdit, loggedIn, user, listUsers, fetchingUsers, users, selectedGroup, promote, demote, kick, login, loginError, toggleEditModal } = props

  return (
    <div>
      <UserEditModal
        isOpen={isEditOpen}
        toggleModal={toggleEditModal}
        user={userInEdit}
        editUser={editUser}
        label="Muokkaa tietojasi"
      />
      {loggedIn ? (
        user && (
          <Stack direction="column" spacing={2}>
            <Box width="50%">
              <h1>Tervetuloa {user.username}!</h1>
              <Table size="small" component={Paper} elevation={3}>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Nimi</strong></TableCell>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>PDGA numero</strong></TableCell>
                    <TableCell>{user.pdgaNumber}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button
                sx={{ marginTop: 1 }}
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => toggleEditModal(user)}
              >
                Muokkaa
              </Button>
            </Box>
            <Grid container spacing={1}>
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
                      {user.groups &&
                        user.groups.map(g => (
                          <TableRow
                            key={g.id}
                            onClick={event => clickable(event) && listUsers(g)}
                            className="color-on-hover"
                          >
                            <TableCell>{g.name}</TableCell>
                            <TableCell>
                              {isGroupAdmin(user, g.id) && (
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
                                onClick={() => handleLeavingGroup(editUser, user ? user.id : -1, g.id)}
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
                {fetchingUsers ? (
                  <Box>
                    <Spinner />
                  </Box>
                ) : (
                  <GroupUsersTable
                    users={users}
                    group={selectedGroup}
                    promote={promote}
                    demote={demote}
                    kick={kick}
                  />
                )}
              </Grid>
            </Grid>
          </Stack>
        )
      ) : (
        <GoogleOAuthProvider clientId="107543052765-lfgp4lke6h51a0l4kp258anilpeegf8v.apps.googleusercontent.com">
          <GoogleLogin onSuccess={login} onError={loginError} useOneTap />
        </GoogleOAuthProvider>
      )}
    </div>
  )
}

const clickable = ({ target }) => target.cellIndex !== undefined

const handleLeavingGroup = (editUser: typeof updateUser, userId: number, removeFromGroupId: number): void => {
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
