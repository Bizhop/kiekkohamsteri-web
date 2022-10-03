import React from "react"
import { any, path, pathOr, propEq } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

import { getGroups, getGroupUsers, createGroup, joinGroup, getGroupRequests, completeRequest, promote, demote, kick, deleteGroup } from "./groupActions"
import NewGroupForm from "./NewGroupForm"
import { admin, check, del, boot } from "../shared/images"

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
    <div className="container">
        <h1>Pyynnöt</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Ryhmä</th>
                    <th>Pyytäjä</th>
                    <th>Kohde</th>
                    <th>Tyyppi</th>
                </tr>
            </thead>
            <tbody>
                {props.requests && props.requests.map(r => (
                    <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.group.name}</td>
                        <td>{r.source.username}</td>
                        <td>{r.target.username}</td>
                        <td>{r.type}</td>
                        <td>
                            <CompleteRequestInput
                                completeRequest={props.completeRequest}
                                image={check}
                                groupId={r.group.id}
                                requestId={r.id}
                                confirm={true}
                            />
                        </td>
                        <td>
                            <CompleteRequestInput
                                completeRequest={props.completeRequest}
                                image={del}
                                groupId={r.group.id}
                                requestId={r.id}
                                confirm={false}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h1>Uusi ryhmä</h1>
        <p>Kun luot uuden ryhmän, sinusta tulee automaattisesti ryhmän ensimmäinen ylläpitäjä</p>
        <NewGroupForm onSubmit={props.newGroup} />
        <h1>Ryhmät</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nimi</th>
                </tr>
            </thead>
            <tbody>
                {props.groups && props.groups.map(g => {
                    const userGroup = { user: props.user, groupId: g.id }
                    return (
                        <tr key={g.id}>
                            <td>{g.id}</td>
                            <td>{g.name} {isGroupAdmin(userGroup) && <img src={admin} title="Ylläpitäjä" />}
                            </td>
                            <td>
                                {(isAdmin(userGroup) || isGroupMember(userGroup)) &&
                                    <button onClick={() => props.listUsers(g.id)} className="btn btn-primary">
                                        Listaa käyttäjät
                                    </button>
                                }
                            </td>
                            <td>
                                {!isGroupMember(userGroup) &&
                                    <button onClick={() => props.joinGroup({ userId: props.user.id, groupId: g.id })} className="btn btn-info">
                                        Liity
                                    </button>
                                }
                            </td>
                            <td>
                                {isAdminOrGroupAdmin(userGroup) &&
                                    <img className="clickable on-table" src={del} onClick={() => handleGroupDelete({confirm: props.deleteGroup, id: g.id })} />
                                }
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        {props.fetchingUsers 
            ? <Spinner /> 
            : <UserTable 
                users={props.users}
                group={props.selectedGroup}
                promote={props.promote}
                demote={props.demote}
                kick={props.kick} />}
        {!props.loggedIn && <Navigate to="/" />}
    </div>
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
    <input
        type="image"
        alt="accept"
        src={props.image}
        height="15"
        width="15"
        onClick={() => props.completeRequest(
            {
                groupId: props.groupId,
                requestId: props.requestId,
                confirm: props.confirm
            }
        )}
    />
)

const UserTable = props => (
    <div>
        {props.users &&
            <div>
                <h2>Käyttäjät ({props.group.name})</h2>
                <table className="table table-striped">
                    <tbody>
                        {props.users.map(user => {
                            const userGroup = { user: user, groupId: props.group.id }
                            return (
                                <tr key={user.id}>
                                    <td>{user.username} {isGroupAdmin(userGroup) && <img src={admin} title="Ylläpitäjä" />}</td>
                                    <td>
                                        {isGroupAdmin(userGroup)
                                            ? <div>
                                                <button className="btn btn-danger" onClick={() => props.demote({ userId: user.id, groupId: props.group.id })}>
                                                    Poista ylläpitäjä
                                                </button>
                                            </div>
                                            : <div>
                                                <button className="btn btn-danger" onClick={() => props.promote({ userId: user.id, groupId: props.group.id })}>
                                                    Ylläpitäjäksi
                                                </button>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        <img className="clickable" src={boot} onClick={() => props.kick({ userId: user.id, groupId: props.group.id })} title="Monoa" />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        }
    </div>
)

const mapStateToProps = state => ({
    loggedIn: path(["user", "token"], state),
    groups: pathOr([], ["group", "groups"], state),
    fetchingUsers: path(["group", "fetchingUsers"], state),
    users: path(["group", "users"], state),
    selectedGroup: path(["group", "selectedGroup"], state),
    user: path(["user", "user"], state),
    requests: path(["group", "requests"], state)
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
