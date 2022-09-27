import React from "react"
import { any, path, pathOr, propEq } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"

import { getGroups, getGroupUsers, createGroup, joinGroup, getGroupRequests, completeRequest } from "./groupActions"
import NewGroupForm from "./NewGroupForm"
import { check, del } from "../shared/images"

const isAdmin = ({ user, groupId }) => {
    if (!user || !groupId || !user.roles) return false
    if (any(propEq('name', 'ADMIN'))(user.roles)) return true
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
                            <input
                                type="image"
                                alt="accept"
                                src={check}
                                height="15"
                                width="15"
                                onClick={() => props.completeRequest(
                                    {
                                        groupId: r.group.id,
                                        requestId: r.id,
                                        confirm: true
                                    }
                                )}
                            />
                        </td>
                        <td>
                            <input
                                type="image"
                                alt="reject"
                                src={del}
                                height="15"
                                width="15"
                                onClick={() => props.completeRequest(
                                    {
                                        groupId: r.group.id,
                                        requestId: r.id,
                                        confirm: false
                                    }
                                )}
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
                {props.groups && props.groups.map(g => (
                    <tr key={g.id}>
                        <td>{g.id}</td>
                        <td>{g.name}</td>
                        <td>
                            {isAdmin({ user: props.user, groupId: g.id }) &&
                                <button onClick={() => props.listUsers(g.id)} className="btn btn-primary">
                                    Listaa käyttäjät
                                </button>
                            }
                        </td>
                        <td>
                            {!isGroupMember({ user: props.user, groupId: g.id }) &&
                                <button onClick={() => props.joinGroup({ userId: props.user.id, groupId: g.id })} className="btn btn-info">
                                    Liity
                                </button>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {props.fetchingUsers ? <Spinner /> : <UserTable users={props.users} group={props.selectedGroup} />}
        {!props.loggedIn && <Navigate to="/" />}
    </div>
)

const UserTable = props => (
    <div>
        {props.users &&
            <div>
                <h2>Käyttäjät ({props.group.name})</h2>
                <table className="table table-striped">
                    <tbody>
                        {props.users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                            </tr>
                        ))}
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
    completeRequest: params => dispatch(completeRequest(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer)
