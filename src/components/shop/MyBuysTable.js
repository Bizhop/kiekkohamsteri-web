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

const MyBuysTable = props => {
  if(props.asBuyer.length == 0) return <p>Ei ostoja</p>
  return (
    <TableContainer component={Paper} elevation={3}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Myyjä</TableCell>
          <TableCell>Hinta</TableCell>
          <TableCell>Kiekko</TableCell>
          <TableCell>Lentoarvot</TableCell>
          <TableCell>Kunto</TableCell>
          <TableCell>Paino</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {props.asBuyer.map(buy => (
          <Buy key={buy.id} buy={buy} action={props.action} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)}

const Buy = ({ buy, action }) => {
  const { disc } = buy
  return (
    <TableRow>
      <TableCell>
        <ZoomImage image={disc.image} />
      </TableCell>
      <TableCell>{buy.seller.username}</TableCell>
      <TableCell>{disc.hinta} €</TableCell>
      <TableCell>
        {disc.mold.manufacturer.name} {disc.plastic.name} {disc.mold.name}
      </TableCell>
      <TableCell>
        {disc.mold.speed} / {disc.mold.glide} / {disc.mold.stability} / {disc.mold.fade}
      </TableCell>
      <TableCell>{disc.condition} / 10</TableCell>
      <TableCell>{disc.weight}</TableCell>
      <TableCell>
        <Button variant="contained" color="error" onClick={() => action.action(buy.id)}>
          {action.label}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default MyBuysTable
