import React from "react"
import { Navigate } from "react-router-dom"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Tooltip,
  TableFooter,
  TablePagination
} from "@mui/material"
import EngineeringIcon from "@mui/icons-material/Engineering"
import EditIcon from "@mui/icons-material/Edit"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"

import UserEditModal from "./UserEditModal"
import { IPagination, ISort, TUser, TUserUpdate } from "../../types"
import { isAdmin } from "../shared/utils"

const UsersComponent = ({
  props: { loggedIn, users, isUserEditOpen, userInEdit, userSort, userPagination },
  dispatch: { getUsers, toggleUserEditModal, editUser, promoteUser, demoteUser }
}: {
  props: {
    loggedIn: string | null,
    users: TUser[],
    isUserEditOpen: boolean,
    userInEdit: TUser | null,
    userSort: ISort,
    userPagination: IPagination
  },
  dispatch: {
    getUsers: (sort: ISort, pagination: IPagination) => any,
    toggleUserEditModal: (user: TUser | null) => any,
    editUser: (id: number, user: TUserUpdate) => any,
    promoteUser: (userId: number) => any,
    demoteUser: (userId: number) => any
  }
}): JSX.Element => {
  const handlePageChange = (_event: unknown, newPage: number) => getUsers(userSort, { ...userPagination, number: newPage })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <UserEditModal
        isOpen={isUserEditOpen}
        toggleModal={toggleUserEditModal}
        user={userInEdit}
        editUser={editUser}
        label="Muokkaa käyttäjää"
      />
      <h2>Käyttäjät</h2>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Tunnus</TableCell>
              <TableCell>email</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(p => (
              <User
                key={p.id}
                user={p}
                toggleEditModal={toggleUserEditModal}
                promote={promoteUser}
                demote={demoteUser}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="100%">
                <TablePagination
                  component="div"
                  count={userPagination.totalElements}
                  rowsPerPageOptions={[userPagination.size]}
                  rowsPerPage={userPagination.size}
                  page={userPagination.number}
                  onPageChange={handlePageChange}
                  showFirstButton
                  showLastButton
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {!loggedIn && <Navigate to="/" />}
    </Box>
  )
}

const User = ({ user, toggleEditModal, promote, demote }: {
  user: TUser,
  toggleEditModal: (user: TUser | null) => any,
  promote: (userId: number) => any,
  demote: (userId: number) => any
}): JSX.Element => (
  <TableRow>
    <TableCell>{user.id}</TableCell>
    <TableCell>{user.username}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      {isAdmin(user) && (
        <Tooltip title="Ylläpitäjä">
          <EngineeringIcon />
        </Tooltip>
      )}
    </TableCell>
    <TableCell>
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() => toggleEditModal(user)}
      >
        Muokkaa
      </Button>
    </TableCell>
    <TableCell>
      {isAdmin(user) ? (
        <Button
          variant="contained"
          color="error"
          startIcon={<PersonRemoveIcon />}
          onClick={() => demote(user.id)}
        >
          Poista ylläpitäjä
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PersonAddIcon />}
          onClick={() => promote(user.id)}
        >
          Lisää ylläpitäjäksi
        </Button>
      )}
    </TableCell>
  </TableRow>
)

export default UsersComponent
