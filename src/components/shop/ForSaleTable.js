import React from "react"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from "@mui/material"

import ZoomImage from "../shared/ZoomImage"
import { markings } from "../shared/constants"

const ForSaleTable = props => (
  <TableContainer component={Paper} elevation={3}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Omistaja</TableCell>
          <TableCell>Hinta</TableCell>
          <TableCell>Kiekko</TableCell>
          <TableCell>Lentoarvot</TableCell>
          <TableCell>Kunto</TableCell>
          <TableCell>Tussit</TableCell>
          <TableCell>Paino</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {props.discs.map(disc => (
          <Disc
            key={disc.uuid}
            disc={disc}
            action={{ ...props.action, id: disc.uuid }}
            username={props.username}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

const Disc = ({ disc, username, action }) => (
  <TableRow>
    <TableCell>
      <ZoomImage image={disc.image} />
    </TableCell>
    <TableCell>{disc.owner.username}</TableCell>
    <TableCell>{disc.price} €</TableCell>
    <TableCell>
      {disc.mold.manufacturer.name} {disc.plastic.name} {disc.mold.name}
    </TableCell>
    <TableCell>
      {disc.mold.speed} / {disc.mold.glide} / {disc.mold.stability} / {disc.mold.fade}
    </TableCell>
    <TableCell>{disc.condition} / 10</TableCell>
    <TableCell>{markings[disc.markings - 1]}</TableCell>
    <TableCell>{disc.weight}</TableCell>
    <TableCell>
      <Button
        variant="contained"
        disabled={disc.owner.username === username}
        onClick={() => action.action(action.id)}
      >
        {action.label}
      </Button>
    </TableCell>
  </TableRow>
)

const tableHeaders = [
  {
    label: "Omistaja",
  },
  {
    label: "Hinta",
  },
  {
    label: "Kiekko",
  },
  {
    label: "Lentoarvot",
  },
  {
    label: "Kunto",
  },
  {
    label: "Tussit",
  },
  {
    label: "Paino",
  },
]

export default ForSaleTable
