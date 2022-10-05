import React from "react"
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, Button } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"

import ThWithButton from "../shared/ThWithButton"
import ZoomImage from "../shared/ZoomImage"

const OstoTable = props => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          {tableHeaders.map(t => <ThWithButton {...t} key={t.label} />)}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.ostot.map(p => <Osto key={p.id} osto={p} action={props.action} />)}
      </TableBody>
    </Table>
  </TableContainer>
)

const Osto = props => {
  const kiekko = props.osto.kiekko
  return (
    <TableRow>
      <TableCell>
        <ZoomImage image={kiekko.kuva} />
      </TableCell>
      <TableCell>{kiekko.id}</TableCell>
      <TableCell>{props.osto.myyja.username}</TableCell>
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
        <Button
          variant="contained"
          color="error"
          onClick={() => props.action.action(props.osto.id)}
        >
          {props.action.label}
        </Button>
      </TableCell>
    </TableRow>
  )
}

const tableHeaders = [
  {
    label: "Id"
  },
  {
    label: "Myyjä"
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
  },
  {
    label: "Peruuta"
  }
]

export default OstoTable
