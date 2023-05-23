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
import { TDisc } from "../../types"
import { IStringAction } from "./ShopContainer"

const ForSaleTable = ({ discs, buy, username }: {
  discs: TDisc[], buy: IStringAction, username?: string
}): JSX.Element => {
  return (
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
          {discs.map(disc => (
            <Disc
              key={disc.uuid}
              disc={disc}
              buy={buy}
              username={username}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Disc = ({ disc, username, buy }: {
  disc: TDisc, username?: string, buy: IStringAction
}): JSX.Element => {
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
      <TableCell>{markings[disc.markings - 1]}</TableCell>
      <TableCell>{disc.weight}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          disabled={disc.owner.username === username}
          onClick={() => buy.action(disc.uuid)}
        >
          {buy.label}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default ForSaleTable
