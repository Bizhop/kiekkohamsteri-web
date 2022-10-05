import React from "react"
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, IconButton, Tooltip } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import CircleIcon from '@mui/icons-material/Circle';

import ThWithButton from "../shared/ThWithButton"
import ZoomImage from "../shared/ZoomImage"

const MyyntiTable = props => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          {tableHeaders.map(t => <ThWithButton {...t} key={t.label} />)}
          <TableCell />
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {props.myynnit.map(p => (
          <Myynti key={p.id} myynti={p} accept={props.accept} cancel={props.cancel} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

const Myynti = props => {
  const kiekko = props.myynti.kiekko
  return (
    <TableRow>
      <TableCell>
        <ZoomImage image={kiekko.kuva} />
      </TableCell>
      <TableCell>{kiekko.id}</TableCell>
      <TableCell>{props.myynti.ostaja.username}</TableCell>
      <TableCell>{kiekko.hinta} €</TableCell>
      <TableCell>
        {kiekko.mold.valmistaja.valmistaja} {kiekko.muovi.muovi} {kiekko.mold.kiekko}
      </TableCell>
      <TableCell>
        {kiekko.mold.nopeus} / {kiekko.mold.liito} / {kiekko.mold.vakaus} / {kiekko.mold.feidi}
      </TableCell>
      <TableCell>{kiekko.kunto} / 10</TableCell>
      <TableCell>{kiekko.paino}</TableCell>
      <TableCell>{kiekko.dyed && <CircleIcon />}</TableCell>
      <TableCell>{kiekko.hohto && <CircleIcon />}</TableCell>
      <TableCell>{kiekko.swirly && <CircleIcon />}</TableCell>
      <TableCell>{kiekko.spessu && <CircleIcon />}</TableCell>
      <TableCell>
        <Tooltip title={props.accept.label}>
          <IconButton
            variant="contained"
            onClick={() => props.accept.action(props.myynti.id)}
          >
            <CheckIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title={props.cancel.label}>
          <IconButton
            variant="contained"
            onClick={() => props.cancel.action(props.myynti.id)}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

const tableHeaders = [
  {
    label: "Id"
  },
  {
    label: "Ostaja"
  },
  {
    label: "Hinta"
  },
  {
    label: "Kiekko"
  },
  {
    label: "Lentonumerot"
  },
  {
    label: "Kunto"
  },
  {
    label: "Paino"
  },
  {
    label: "Dyed"
  },
  {
    label: "Hohto"
  },
  {
    label: "Swirly"
  },
  {
    label: "Spessu"
  }
]

export default MyyntiTable
