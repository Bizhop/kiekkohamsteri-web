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
import { INumberAction } from "./ShopContainer"
import { TBuy } from "../../types"

const MySalesTable = ({ asSeller, confirm, reject }: {
  asSeller: TBuy[], confirm: INumberAction, reject: INumberAction
}): JSX.Element => {
  if (asSeller.length == 0) return <p>Ei myyntejä</p>
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
          {asSeller.map((sale: TBuy) => (
            <Sale key={sale.id} sale={sale} confirm={confirm} reject={reject} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Sale = ({ sale, confirm, reject }: {
  sale: TBuy,
  confirm: INumberAction,
  reject: INumberAction
}) => {
  const { disc } = sale
  return (
    <TableRow>
      <TableCell>
        <ZoomImage image={disc.image} />
      </TableCell>
      <TableCell>{sale.buyer.username}</TableCell>
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
        <Tooltip title={confirm.label}>
          <IconButton onClick={() => confirm.action(sale.id)}>
            <CheckIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title={reject.label}>
          <IconButton onClick={() => reject.action(sale.id)}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default MySalesTable
