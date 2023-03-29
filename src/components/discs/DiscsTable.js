import React from "react"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { useNavigate } from "react-router-dom"
import { Spinner } from "react-activity"
import Dropzone from "react-dropzone"
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
  MenuItem,
  Divider,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"

import ZoomImage from "../shared/ZoomImage"
import Selector from "../shared/Selector"
import { defaultSort } from "../shared/constants"

const DiscsTable = props => {
  const { filters, sort, pagination } = props

  const handlePageChange = (_, newPage) =>
    props.search(sort, { ...pagination, number: newPage }, filters)

  const handleNewSort = (event) =>
    props.search(event.target.value, pagination, filters)

  const navigate = useNavigate()
  return (
    <Box sx={{ marginTop: 3 }}>
      {props.sortOptions &&
        <SortSelector
          handleNewSort={handleNewSort}
          sortOptions={props.sortOptions}
        />
      }
      <Divider />
      <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 650 }}>
        {props.discs ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Valmistaja</TableCell>
                <TableCell>Malli</TableCell>
                <TableCell>Muovi</TableCell>
                <TableCell>Lentoarvot</TableCell>
                <TableCell>Kunto</TableCell>
                <TableCell>Paino</TableCell>
                <TableCell>Päivitetty</TableCell>
                {props.lostDiscs && <TableCell />}
                {props.lostDiscs && <TableCell />}
                {props.editable && <TableCell />}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.discs.map(disc => (
                <Disc
                  key={disc.uuid}
                  disc={disc}
                  toggleEditModal={props.toggleEditModal}
                  deleteDisc={props.deleteDisc}
                  editable={props.editable}
                  lostDiscs={props.lostDiscs}
                  username={props.username}
                  found={props.found}
                  navigate={navigate}
                  handleAcceptedFiles={props.handleAcceptedFiles}
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
                    showFirstButton
                    showLastButton
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

const SortSelector = ({ handleNewSort, sortOptions }) => {
  const optionsList = sortOptions.map(sortOpt => (
    <MenuItem key={sortOpt.column} value={sortOpt}>
      {sortOpt.column}
    </MenuItem>
  ))

  return (
    <Selector
      label="Järjestys"
      onChange={handleNewSort}
      optionsList={optionsList}
      defaultValue={defaultSort}
    />
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
  handleAcceptedFiles
}) => {
  return (
    <TableRow
      className={editable || disc.publicDisc ? "color-on-hover" : ""}
      onClick={event =>
        (editable || disc.publicDisc) && clickable(event) && navigate(`/discs/${disc.uuid}`)
      }
    >
      <TableCell>
        <ZoomImage image={disc.image} />
      </TableCell>
      <TableCell>{disc.mold.manufacturer.name}</TableCell>
      <TableCell>{disc.mold.name}</TableCell>
      <TableCell>{disc.plastic.name}</TableCell>
      <TableCell>{disc.mold.speed} / {disc.mold.glide} / {disc.mold.stability} / {disc.mold.fade}</TableCell>
      <TableCell>{disc.condition}/10</TableCell>
      <TableCell>{disc.weight}</TableCell>
      <TableCell>{disc.updatedAt}</TableCell>
      {lostDiscs && <TableCell>{disc.updatedAt}</TableCell>}
      {lostDiscs && (
        <TableCell>
          {username === disc.owner.username && (
            <Tooltip title="Löytynyt">
              <IconButton onClick={() => found(disc.uuid)}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      )}
      {editable && (
        <TableCell sx={{ display: "flex" }}>
          <Dropzone onDrop={acceptedFiles => handleAcceptedFiles({ uuid: disc.uuid, acceptedFiles })}>
            {imageDropzone}
          </Dropzone>
          <IconButton color="secondary" onClick={() => toggleEditModal(disc)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() =>
              handleDelete({
                uuid: disc.uuid,
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

const imageDropzone = ({ getRootProps, getInputProps }) => {
  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      <IconButton color="primary">
        <AddAPhotoIcon />
      </IconButton>
    </div>
  )
}

const handleDelete = ({ uuid, confirm }) => {
  confirmAlert({
    title: "Varoitus",
    message: "Haluatko varmasti poistaa kiekon?",
    buttons: [
      {
        label: "Poista",
        onClick: () => confirm(uuid),
        className: "red-button",
      },
      {
        label: "Peruuta",
      },
    ],
  })
}

export default DiscsTable
