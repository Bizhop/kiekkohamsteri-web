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
import { TBuy } from "../../types"
import { INumberAction } from "./ShopContainer"

const MyBuysTable = ({ asBuyer, reject }: {
  asBuyer: TBuy[], reject: INumberAction
}): JSX.Element => {
  if(asBuyer.length == 0) return <p>Ei ostoja</p>
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
        {asBuyer.map(buy => (
          <Buy key={buy.id} buy={buy} reject={reject} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)}

const Buy = ({ buy, reject }: {
  buy: TBuy, reject: INumberAction
}): JSX.Element => {
  const { disc } = buy
  return (
    <TableRow>
      <TableCell>
        <ZoomImage image={disc.image} />
      </TableCell>
      <TableCell>{disc.owner.username}</TableCell>
      <TableCell>{disc.price} €</TableCell>
      <TableCell>
        {disc.mold?.manufacturer.name} {disc.plastic?.name} {disc.mold?.name}
      </TableCell>
      <TableCell>
        {disc.mold?.speed} / {disc.mold?.glide} / {disc.mold?.stability} / {disc.mold?.fade}
      </TableCell>
      <TableCell>{disc.condition} / 10</TableCell>
      <TableCell>{disc.weight}</TableCell>
      <TableCell>
        <Button variant="contained" color="error" onClick={() => reject.action(buy.id)}>
          {reject.label}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default MyBuysTable
