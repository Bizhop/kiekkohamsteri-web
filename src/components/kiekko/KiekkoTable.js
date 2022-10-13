import React from "react"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { NavLink } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"

import ThWithButton from "../shared/ThWithButton"
import { defaultSort } from "../shared/text"
import ZoomImage from "../shared/ZoomImage"

const KiekkoTable = props => (
  <TableContainer component={Paper} sx={{ maxHeight: 520 }} >
    {props.kiekot ? (
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHeaders.map(t => (
              <ThWithButton
                {...t}
                key={t.label}
                update={props.updateKiekot}
                sortColumn={props.sortColumn}
                userId={props.userId}
              />
            ))}
            {props.lostDiscs && (
              <ThWithButton
                label="Pvm"
                sort="createdAt,desc"
                update={props.updateKiekot}
                sortColumn={props.sortColumn}
                userId={props.userId}
              />
            )}
            <TableCell />
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
            />
          ))}
        </TableBody>
      </Table>
    ) : (
      <Spinner />
    )}
  </TableContainer>
)

const Kiekko = props => {
  const kiekko = props.kiekko
  return (
    <TableRow>
      <TableCell>
        <ZoomImage image={kiekko.kuva} />
      </TableCell>
      <TableCell>
        {props.editable || kiekko.publicDisc
          ? <NavLink
            to={`/discs/${kiekko.id}`}
            target="_disc"
          >
            {kiekko.id}
          </NavLink>
          : kiekko.id
        }
      </TableCell>
      <TableCell>{kiekko.valmistaja}</TableCell>
      <TableCell>{kiekko.mold}</TableCell>
      <TableCell>{kiekko.muovi}</TableCell>
      <TableCell>{kiekko.nopeus}</TableCell>
      <TableCell>{kiekko.liito}</TableCell>
      <TableCell>{kiekko.vakaus}</TableCell>
      <TableCell>{kiekko.feidi}</TableCell>
      <TableCell>{kiekko.paino}</TableCell>
      {props.lostDiscs && <TableCell>{kiekko.updatedAt}</TableCell>}
      {props.lostDiscs && (
        <TableCell>
          {props.username === kiekko.omistaja &&
            <Tooltip title="Löytynyt">
              <IconButton onClick={() => props.found(kiekko.id)}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          }
        </TableCell>
      )}
      <TableCell>
        {props.editable && (
          <IconButton
            disabled={props.image === null}
            onClick={() =>
              props.updateImage({
                id: kiekko.id,
                image: props.image
              })}
          >
            <CloudUploadIcon />
          </IconButton>
        )}
        {props.editable && (
          <IconButton onClick={() => props.toggleEditModal(kiekko)}>
            <EditIcon />
          </IconButton>
        )}
        {props.editable && (
          <IconButton
            onClick={() =>
              handleDelete({
                id: kiekko.id,
                confirm: props.deleteDisc
              })}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  )
}

const tableHeaders = [
  {
    label: "Id",
    sort: "id,desc"
  },
  {
    label: "Valmistaja",
    sort: defaultSort.sort
  },
  {
    label: "Mold",
    sort: "mold.kiekko,asc"
  },
  {
    label: "Muovi",
    sort: "muovi.muovi,asc"
  },
  {
    label: "SPD",
    sort: "mold.nopeus,desc"
  },
  {
    label: "GLD",
    sort: "mold.liito,desc"
  },
  {
    label: "STA",
    sort: "mold.vakaus,asc"
  },
  {
    label: "FAD",
    sort: "mold.feidi,asc"
  },
  {
    label: "Paino",
    sort: "paino,desc"
  }
]

const handleDelete = params => {
  confirmAlert({
    title: "Varoitus",
    message: "Haluatko varmasti poistaa kiekon?",
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

export default KiekkoTable
