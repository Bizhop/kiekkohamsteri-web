import React from "react"
import { any, path, pathOr, propEq, length } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { IconButton, Tooltip, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, Box } from "@mui/material"
import EngineeringIcon from "@mui/icons-material/Engineering"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"

import { getGroups, getGroupUsers, createGroup, joinGroup, getGroupRequests, completeRequest, promote, demote, kick, deleteGroup } from "./groupActions"
import NewGroupForm from "./NewGroupForm"

const isAdminOrGroupAdmin = props => {
    return isAdmin(props) || isGroupAdmin(props)
}

const isAdmin = ({ user, groupId }) => {
    if (!user || !groupId || !user.roles) return false
    return any(propEq('name', 'ADMIN'))(user.roles)
}

const isGroupAdmin = ({ user, groupId }) => {
    if (!user || !groupId || !user.roles) return false
    return any(propEq('name', 'GROUP_ADMIN') && propEq('groupId', groupId))(user.roles)
}

const isGroupMember = ({ user, groupId }) => {
    if (!user || !groupId || !user.groups) return false
    return any(propEq('id', groupId))(user.groups)
}

const GroupContainer = props => (
    <Box sx={{ flexGrow: 1 }}>
        <h1>Pyynnöt ({length(props.requests)})</h1>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Ryhmä</TableCell>
                        <TableCell>Pyytäjä</TableCell>
                        <TableCell>Kohde</TableCell>
                        <TableCell>Tyyppi</TableCell>
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.requests && props.requests.map(r => (
                        <TableRow key={r.id}>
                            <TableCell>{r.id}</TableCell>
                            <TableCell>{r.group.name}</TableCell>
                            <TableCell>{r.source.username}</TableCell>
                            <TableCell>{r.target.username}</TableCell>
                            <TableCell>{r.type}</TableCell>
                            <TableCell>
                                <CompleteRequestInput
                                    completeRequest={props.completeRequest}
                                    groupId={r.group.id}
                                    requestId={r.id}
                                    confirm={true}
                                />
                            </TableCell>
                            <TableCell>
                                <CompleteRequestInput
                                    completeRequest={props.completeRequest}
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
        <h1>Uusi ryhmä</h1>
        <p>Kun luot uuden ryhmän, sinusta tulee automaattisesti ryhmän ensimmäinen ylläpitäjä</p>
        <NewGroupForm onSubmit={props.newGroup} />
        <h1>Ryhmät ({length(props.groups)})</h1>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nimi</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.groups.map(g => {
                        const userGroup = { user: props.user, groupId: g.id }
                        return (
                            <TableRow key={g.id}>
                                <TableCell>{g.id}</TableCell>
                                <TableCell>
                                    {isGroupAdmin(userGroup) && <Tooltip title="Ylläpitäjä"><EngineeringIcon /></Tooltip>} {g.name}
                                </TableCell>
                                <TableCell>
                                    {(isAdmin(userGroup) || isGroupMember(userGroup)) &&
                                        <Button
                                            variant="contained"
                                            onClick={() => props.listUsers(g.id)}
                                        >
                                            Listaa käyttäjät
                                        </Button>
                                    }
                                </TableCell>
                                <TableCell>
                                    {!isGroupMember(userGroup) &&
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => props.joinGroup({ userId: props.user.id, groupId: g.id })}
                                        >
                                            Liity
                                        </Button>
                                    }
                                </TableCell>
                                <TableCell>
                                    {isAdminOrGroupAdmin(userGroup) &&
                                        <Tooltip title="Poista ryhmä">
                                            <IconButton onClick={() => handleGroupDelete({ confirm: props.deleteGroup, id: g.id })} >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        {props.fetchingUsers
            ? <Spinner />
            : <UserTable
                users={props.users}
                group={props.selectedGroup}
                promote={props.promote}
                demote={props.demote}
                kick={props.kick} />}
        {!props.loggedIn && <Navigate to="/" />}
    </Box>
)

const handleGroupDelete = params => {
    confirmAlert({
        title: "Varoitus",
        message: "Haluatko varmasti poistaa ryhmän?",
        buttons: [
            {
                label: "Poista",
                onClick: () => params.confirm(params.id),
                className: "red-button"
            },
            {
                label: "Peruuta"
            }
        ]
    })
}

const CompleteRequestInput = props => (
    <Tooltip title={props.confirm ? "Hyväksy" : "Hylkää"}>
        <IconButton
            onClick={() => props.completeRequest(
                {
                    groupId: props.groupId,
                    requestId: props.requestId,
                    confirm: props.confirm
                }
            )}
        >
            {props.confirm ? <CheckIcon /> : <CloseIcon />}
        </IconButton>
    </Tooltip>
)

const UserTable = props =>
    <div>
        {props.users &&
            <div>
                <h2>Käyttäjät ({props.group.name}, {length(props.users)})</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {props.users.map(user => {
                                const userGroup = { user: user, groupId: props.group.id }
                                return (
                                    <TableRow key={user.id}>
                                        <TableCell>{isGroupAdmin(userGroup) && <EngineeringIcon />} {user.username}</TableCell>
                                        <TableCell>
                                            {isGroupAdmin(userGroup)
                                                ? <Button
                                                    variant="contained"
                                                    color="error"
                                                    startIcon={<PersonRemoveIcon />}
                                                    onClick={() => props.demote({ userId: user.id, groupId: props.group.id })}
                                                >
                                                    Poista ylläpitäjä
                                                </Button>
                                                : <Button
                                                    variant="contained"
                                                    startIcon={<PersonAddIcon />}
                                                    onClick={() => props.promote({ userId: user.id, groupId: props.group.id })}
                                                >
                                                    Ylläpitäjäksi
                                                </Button>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Monoa">
                                                <IconButton onClick={() => props.kick({ userId: user.id, groupId: props.group.id })}>
                                                    <SportsMartialArtsIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        }
    </div>

const mapStateToProps = state => ({
    loggedIn: path(["user", "token"], state),
    groups: pathOr([], ["group", "groups"], state),
    fetchingUsers: path(["group", "fetchingUsers"], state),
    users: path(["group", "users"], state),
    selectedGroup: path(["group", "selectedGroup"], state),
    user: path(["user", "user"], state),
    requests: pathOr([], ["group", "requests"], state)
})

const mapDispatchToProps = dispatch => ({
    getGroups: dispatch(getGroups()),
    getRequests: dispatch(getGroupRequests()),
    listUsers: groupId => dispatch(getGroupUsers(groupId)),
    newGroup: group => dispatch(createGroup(group)),
    joinGroup: params => dispatch(joinGroup(params)),
    completeRequest: params => dispatch(completeRequest(params)),
    promote: params => dispatch(promote(params)),
    demote: params => dispatch(demote(params)),
    kick: params => dispatch(kick(params)),
    deleteGroup: groupId => dispatch(deleteGroup(groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer)
