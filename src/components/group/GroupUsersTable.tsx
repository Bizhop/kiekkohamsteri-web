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
  Box,
} from "@mui/material"
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import EngineeringIcon from "@mui/icons-material/Engineering"

import { isGroupAdmin } from "../shared/utils"
import { TGroup, TUser } from "../../types"

const GroupUsersTable = ({ users, group, promote, demote, kick }: {
  users: TUser[],
  group: TGroup | null,
  promote: any,
  demote: any,
  kick: any
}) => {
  if (group == null) return <Box />
  return (
    <Box>
      {users && (
        <TableContainer component={Paper} elevation={3}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>
                  <strong>
                    Käyttäjät ({group.name}, {length(users)})
                  </strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: TUser) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      {isGroupAdmin(user, group.id) && (
                        <Tooltip title="Ylläpitäjä">
                          <EngineeringIcon />
                        </Tooltip>
                      )}
                      <NavLink to={`/users/${user.id}`} target="_user">
                        {user.username}
                      </NavLink>
                    </TableCell>
                    <TableCell>
                      {isGroupAdmin(user, group.id) ? (
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<PersonRemoveIcon />}
                          onClick={() => demote({ userId: user.id, groupId: group.id })}
                        >
                          Poista ylläpitäjä
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<PersonAddIcon />}
                          onClick={() =>
                            promote({ userId: user.id, groupId: group.id })
                          }
                        >
                          Ylläpitäjäksi
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Monoa">
                        <IconButton
                          onClick={() => kick({ userId: user.id, groupId: group.id })}
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
      )}
    </Box>
  )
}

export default GroupUsersTable
