import React from "react"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { useNavigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Box,
  TableFooter,
  TablePagination,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"

import ThWithButton from "../shared/ThWithButton"
import { defaultSort } from "../shared/constants"
import ZoomImage from "../shared/ZoomImage"

const DiscsTable = props => {
  const { filters, sort, pagination } = props

  const handlePageChange = (_, newPage) =>
    props.search({ filters, sort, pagination: { ...pagination, number: newPage } })

  const navigate = useNavigate()
  return (
    <Box sx={{ marginTop: 3 }}>
      <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 650 }}>
        {props.discs ? (
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                {tableHeaders.map(t => (
                  <ThWithButton
                    {...t}
                    key={t.label}
                    update={props.search}
                    userId={props.userId}
                    previousSort={sort}
                    pagination={pagination}
                    filters={filters}
                  />
                ))}
                {props.lostDiscs && (
                  <ThWithButton
                    label="Pvm"
                    sort="createdAt,desc"
                    update={props.search}
                    userId={props.userId}
                    previousSort={sort}
                    pagination={pagination}
                    filters={filters}
                  />
                )}
                {props.lostDiscs && <TableCell />}
                {props.editable && <TableCell />}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.discs.map(disc => (
                <Disc
                  key={disc.id}
                  disc={disc}
                  toggleEditModal={props.toggleEditModal}
                  deleteDisc={props.deleteDisc}
                  updateImage={props.updateImage}
                  image={props.image}
                  editable={props.editable}
                  lostDiscs={props.lostDiscs}
                  username={props.username}
                  found={props.found}
                  navigate={navigate}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="100%">
                  <TablePagination
                    component="div"
                    count={pagination.totalElements}
                    rowsPerPageOptions={[pagination.size]}
                    rowsPerPage={pagination.size}
                    page={pagination.number}
                    onPageChange={handlePageChange}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <Spinner />
        )}
      </TableContainer>
    </Box>
  )
}

const clickable = ({ target }) => target.cellIndex && target.cellIndex > 0 && target.cellIndex < 9

const Disc = ({
  disc,
  editable,
  lostDiscs,
  username,
  found,
  toggleEditModal,
  deleteDisc,
  navigate,
}) => {
  return (
    <TableRow
      className={editable || disc.publicDisc ? "color-on-hover" : ""}
      onClick={event =>
        (editable || disc.publicDisc) && clickable(event) && navigate(`/discs/${disc.id}`)
      }
    >
      <TableCell>
        <ZoomImage image={disc.image} />
      </TableCell>
      <TableCell>{disc.mold.manufacturer.name}</TableCell>
      <TableCell>{disc.mold.name}</TableCell>
      <TableCell>{disc.plastic.name}</TableCell>
      <TableCell>{disc.mold.speed}</TableCell>
      <TableCell>{disc.mold.glide}</TableCell>
      <TableCell>{disc.mold.stability}</TableCell>
      <TableCell>{disc.mold.fade}</TableCell>
      <TableCell>{disc.weight}</TableCell>
      {lostDiscs && <TableCell>{disc.updatedAt}</TableCell>}
      {lostDiscs && (
        <TableCell>
          {username === disc.owner.username && (
            <Tooltip title="Löytynyt">
              <IconButton onClick={() => found(disc.id)}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      )}
      {editable && (
        <TableCell sx={{ display: "flex" }}>
          <IconButton color="secondary" onClick={() => toggleEditModal(disc)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() =>
              handleDelete({
                id: disc.id,
                confirm: deleteDisc,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  )
}

const tableHeaders = [
  {
    label: "Valmistaja",
    sort: defaultSort.sort,
  },
  {
    label: "Mold",
    sort: "mold.name,asc",
  },
  {
    label: "Muovi",
    sort: "plastic.name,asc",
  },
  {
    label: "SPD",
    sort: "mold.speed,desc",
  },
  {
    label: "GLD",
    sort: "mold.glide,desc",
  },
  {
    label: "STA",
    sort: "mold.stability,asc",
  },
  {
    label: "FAD",
    sort: "mold.fade,asc",
  },
  {
    label: "Paino",
    sort: "weight,desc",
  },
]

const handleDelete = params => {
  confirmAlert({
    title: "Varoitus",
    message: "Haluatko varmasti poistaa kiekon?",
    buttons: [
      {
        label: "Poista",
        onClick: () => params.confirm(params.id),
        className: "red-button",
      },
      {
        label: "Peruuta",
      },
    ],
  })
}

export default DiscsTable
