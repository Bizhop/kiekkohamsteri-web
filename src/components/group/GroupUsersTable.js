import React from "react"
import { length } from "ramda"
import { NavLink } from "react-router-dom"
import {
  IconButton,
  Tooltip,
  Button,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "@mui/material"
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import EngineeringIcon from "@mui/icons-material/Engineering"

import { isGroupAdmin } from "../shared/utils"

const GroupUsersTable = props => {
  if (props.group == null) return null
  return (
    <div>
      {props.users && (
        <div>
          <TableContainer component={Paper} elevation={3}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <strong>
                      Käyttäjät ({props.group.name}, {length(props.users)})
                    </strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.users.map(user => {
                  const userGroup = { user: user, groupId: props.group.id }
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        {isGroupAdmin(userGroup) && (
                          <Tooltip title="Ylläpitäjä">
                            <EngineeringIcon />
                          </Tooltip>
                        )}
                        <NavLink to={`/users/${user.id}`} target="_user">
                          {user.username}
                        </NavLink>
                      </TableCell>
                      <TableCell>
                        {isGroupAdmin(userGroup) ? (
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<PersonRemoveIcon />}
                            onClick={() => props.demote({ userId: user.id, groupId: props.group.id })}
                          >
                            Poista ylläpitäjä
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            startIcon={<PersonAddIcon />}
                            onClick={() =>
                              props.promote({ userId: user.id, groupId: props.group.id })
                            }
                          >
                            Ylläpitäjäksi
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Monoa">
                          <IconButton
                            onClick={() => props.kick({ userId: user.id, groupId: props.group.id })}
                          >
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
      )}
    </div>
  )
}

export default GroupUsersTable
