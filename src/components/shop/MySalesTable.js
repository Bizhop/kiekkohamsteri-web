import React from "react"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  Tooltip,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"

import ZoomImage from "../shared/ZoomImage"

const MySalesTable = props => {
  if (props.asSeller.length == 0) return <p>Ei myyntejä</p>
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Ostaja</TableCell>
            <TableCell>Hinta</TableCell>
            <TableCell>Kiekko</TableCell>
            <TableCell>Lentoarvot</TableCell>
            <TableCell>Kunto</TableCell>
            <TableCell>Paino</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.asSeller.map(sale => (
            <Sale key={sale.id} sale={sale} accept={props.accept} cancel={props.cancel} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Sale = ({ sale, accept, cancel }) => {
  const { disc } = sale
  return (
    <TableRow>
      <TableCell>
        <ZoomImage image={disc.image} />
      </TableCell>
      <TableCell>{sale.buyer.username}</TableCell>
      <TableCell>{disc.price} €</TableCell>
      <TableCell>
        {disc.mold.manufacturer.name} {disc.plastic.name} {disc.mold.name}
      </TableCell>
      <TableCell>
        {disc.mold.speed} / {disc.mold.glide} / {disc.mold.stability} / {disc.mold.fade}
      </TableCell>
      <TableCell>{disc.condition} / 10</TableCell>
      <TableCell>{disc.weight}</TableCell>
      <TableCell>
        <Tooltip title={accept.label}>
          <IconButton variant="contained" onClick={() => accept.action(sale.id)}>
            <CheckIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title={cancel.label}>
          <IconButton variant="contained" onClick={() => cancel.action(sale.id)}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default MySalesTable
