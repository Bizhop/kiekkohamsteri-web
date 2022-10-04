import React from "react"
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, Button } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"

import ThWithButton from "../shared/ThWithButton"
import ZoomImage from "../shared/ZoomImage"
import { tussit } from "../shared/text"

const MyytavatTable = props => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          {tableHeaders.map(t => (
            <ThWithButton
              {...t}
              key={t.label}
              update={props.updateMyytavat}
              sortColumn={props.sortColumn}
            />
          ))}
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {props.kiekot.map(p => (
          <Kiekko
            key={p.id}
            kiekko={p}
            action={{ ...props.action, id: p.id }}
            username={props.username}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

const Kiekko = props => {
  const kiekko = props.kiekko
  return (
    <TableRow>
      <TableCell>
        <ZoomImage image={kiekko.kuva} />
      </TableCell>
      <TableCell>{kiekko.id}</TableCell>
      <TableCell>{kiekko.omistaja}</TableCell>
      <TableCell>{kiekko.hinta} €</TableCell>
      <TableCell>
        {kiekko.valmistaja} {kiekko.muovi} {kiekko.mold}
      </TableCell>
      <TableCell>
        {kiekko.nopeus} / {kiekko.liito} / {kiekko.vakaus} / {kiekko.feidi}
      </TableCell>
      <TableCell>{kiekko.kunto} / 10</TableCell>
      <TableCell>{tussit[kiekko.tussit - 1]}</TableCell>
      <TableCell>{kiekko.paino}</TableCell>
      <TableCell>{kiekko.dyed && <CheckIcon />}</TableCell>
      <TableCell>{kiekko.hohto && <CheckIcon />}</TableCell>
      <TableCell>{kiekko.swirly && <CheckIcon />}</TableCell>
      <TableCell>{kiekko.spessu && <CheckIcon />}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          disabled={kiekko.omistaja === props.username}
          onClick={() => props.action.action(props.action.id)}
        >
          {props.action.label}
        </Button>
      </TableCell>
    </TableRow>
  )
}

const tableHeaders = [
  {
    label: "Id",
    sort: "id,asc"
  },
  {
    label: "Omistaja",
    sort: "member.username,asc"
  },
  {
    label: "Hinta",
    sort: "hinta,asc"
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
    label: "Tussit"
  },
  {
    label: "Paino",
    sort: "paino,asc"
  },
  {
    label: "Dyed",
    sort: "dyed,desc"
  },
  {
    label: "Hohto",
    sort: "hohto,desc"
  },
  {
    label: "Swirly",
    sort: "swirly,desc"
  },
  {
    label: "Spessu",
    sort: "spessu,desc"
  }
]

export default MyytavatTable
