import React, { useEffect } from "react"
import { length } from "ramda"
import { ConnectedProps, connect, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import {
  IconButton,
  Tooltip,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
  Grid,
} from "@mui/material"
import EngineeringIcon from "@mui/icons-material/Engineering"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"

import {
  getGroups,
  getGroupUsers,
  createGroup,
  joinGroup,
  getGroupRequests,
  completeRequest,
  promote,
  demote,
  kick,
  deleteGroup,
} from "./groupActions"
import { isAdminOrGroupAdmin, isAdmin, isGroupAdmin, isGroupMember } from "../shared/utils"
import NewGroupForm from "./NewGroupForm"
import GroupUsersTable from "./GroupUsersTable"
import { IGroupsState, IUsersState, TGroup, TGroupCreate } from "../../types"

const mapState = ({ user, group }: { user: IUsersState, group: IGroupsState }) => ({
  loggedIn: user.token,
  groups: group.groups || [],
  fetchingUsers: group.fetchingUsers,
  users: group.users,
  selectedGroup: group.selectedGroup,
  user: user.user,
  requests: group.requests || []
})

const mapDispatch = {
  listUsers: (group: TGroup) => getGroupUsers(group),
  newGroup: (group: TGroupCreate) => createGroup(group),
  joinGroup: (userId: number, groupId: number) => joinGroup(userId, groupId),
  completeRequest: (groupId: number, requestId: number, confirm: boolean) => completeRequest(groupId, requestId, confirm),
  promote: (userId: number, groupId: number) => promote(userId, groupId),
  demote: (userId: number, groupId: number) => demote(userId, groupId),
  kick: (userId: number, groupId: number) => kick(userId, groupId),
  deleteGroup: (groupId: number) => deleteGroup(groupId),
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export const GroupContainer = (props: PropsFromRedux): JSX.Element => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getGroups())
    dispatch(getGroupRequests())
  }, [])

  const { loggedIn, groups, fetchingUsers, users, selectedGroup, user, requests, listUsers, newGroup, joinGroup, completeRequest, promote, demote, kick, deleteGroup } = props
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>Pyynnöt</h1>
      {requests.length == 0 ? <p>Ei pyyntöjä</p> :
        <TableContainer component={Paper} elevation={3}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ryhmä</TableCell>
                <TableCell>Pyytäjä</TableCell>
                <TableCell>Kohde</TableCell>
                <TableCell>Tyyppi</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.group.name}</TableCell>
                    <TableCell>{r.source.username}</TableCell>
                    <TableCell>{r.target.username}</TableCell>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>
                      <CompleteRequestInput
                        completeRequest={completeRequest}
                        groupId={r.group.id}
                        requestId={r.id}
                        confirm={true}
                      />
                    </TableCell>
                    <TableCell>
                      <CompleteRequestInput
                        completeRequest={completeRequest}
                        groupId={r.group.id}
                        requestId={r.id}
                        confirm={false}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      <h1>Uusi ryhmä</h1>
      <p>Kun luot uuden ryhmän, sinusta tulee automaattisesti ryhmän ensimmäinen ylläpitäjä</p>
      <Grid container spacing={1}>
        <Grid item md={6}>
          <NewGroupForm onSubmit={newGroup} />
        </Grid>
      </Grid>
      <h1>Ryhmät ({length(groups)})</h1>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <TableContainer component={Paper} elevation={3}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nimi</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map(g => {
                  return (
                    <TableRow
                      key={g.id}
                      onClick={event => clickable(event) && listUsers(g)}
                      className={(isAdmin(user) || isGroupMember(user, g.id)) ? "color-on-hover" : ""}
                    >
                      <TableCell>{g.id}</TableCell>
                      <TableCell>
                        {isGroupAdmin(user, g.id) && (
                          <Tooltip title="Ylläpitäjä">
                            <EngineeringIcon />
                          </Tooltip>
                        )}{" "}
                        {g.name}
                      </TableCell>
                      <TableCell>
                        {!isGroupMember(user, g.id) && (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => user && joinGroup(user.id, g.id)}
                          >
                            Liity
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        {isAdminOrGroupAdmin(user, g.id) && (
                          <Tooltip title="Poista ryhmä">
                            <IconButton
                              onClick={() => handleGroupDelete(deleteGroup, g.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
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
      {!loggedIn && <Navigate to="/" />}
    </Box>
  )
}

const clickable = ({ target }) => target.cellIndex !== undefined

const handleGroupDelete = (confirm: (id: number) => any, id: number) => {
  confirmAlert({
    title: "Varoitus",
    message: "Haluatko varmasti poistaa ryhmän?",
    buttons: [
      {
        label: "Poista",
        onClick: () => confirm(id),
        className: "red-button",
      },
      {
        label: "Peruuta",
      },
    ],
  })
}

const CompleteRequestInput = ({ confirm, completeRequest, groupId, requestId }: {
  confirm: boolean,
  completeRequest: (groupId: number, requestId: number, confirm: boolean) => any,
  groupId: number,
  requestId: number
}): JSX.Element => (
  <Tooltip title={confirm ? "Hyväksy" : "Hylkää"}>
    <IconButton onClick={() => completeRequest(groupId, requestId, confirm)} >
      {confirm ? <CheckIcon /> : <CloseIcon />}
    </IconButton>
  </Tooltip>
)

export default connector(GroupContainer)
