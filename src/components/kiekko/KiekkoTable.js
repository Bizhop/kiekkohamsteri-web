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
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"

import ThWithButton from "../shared/ThWithButton"
import { defaultSort } from "../shared/constants"
import ZoomImage from "../shared/ZoomImage"

const KiekkoTable = props => {
  const { filters, sort, pagination } = props

  const handlePageChange = (_, newPage) =>
    props.search({ filters, sort, pagination: { ...pagination, number: newPage } })

  const navigate = useNavigate()
  return (
    <Box sx={{ marginTop: 3 }}>
      <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 650 }}>
        {props.kiekot ? (
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
              {props.kiekot.map(p => (
                <Kiekko
                  key={p.id}
                  kiekko={p}
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

const Kiekko = props => {
  const kiekko = props.kiekko
  return (
    <TableRow
      className={props.editable || kiekko.publicDisc ? "color-on-hover" : ""}
      onClick={event =>
        (props.editable || kiekko.publicDisc) &&
        clickable(event) &&
        props.navigate(`/discs/${kiekko.id}`)
      }
    >
      <TableCell>
        <ZoomImage image={kiekko.image} />
      </TableCell>
      <TableCell>{kiekko.mold.manufacturer.name}</TableCell>
      <TableCell>{kiekko.mold.name}</TableCell>
      <TableCell>{kiekko.plastic.name}</TableCell>
      <TableCell>{kiekko.mold.speed}</TableCell>
      <TableCell>{kiekko.mold.glide}</TableCell>
      <TableCell>{kiekko.mold.stability}</TableCell>
      <TableCell>{kiekko.mold.fade}</TableCell>
      <TableCell>{kiekko.weight}</TableCell>
      {props.lostDiscs && <TableCell>{kiekko.updatedAt}</TableCell>}
      {props.lostDiscs && (
        <TableCell>
          {props.username === kiekko.owner.username && (
            <Tooltip title="Löytynyt">
              <IconButton onClick={() => props.found(kiekko.id)}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      )}
      {props.editable && (
        <TableCell sx={{ display: "flex" }}>
          <IconButton
            disabled={props.image === null}
            onClick={() =>
              props.updateImage({
                id: kiekko.id,
                image: props.image,
              })
            }
          >
            <CloudUploadIcon />
          </IconButton>
          <IconButton onClick={() => props.toggleEditModal(kiekko)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleDelete({
                id: kiekko.id,
                confirm: props.deleteDisc,
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

export default KiekkoTable
