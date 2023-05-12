import React from "react"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material"

import ThWithButton from "../shared/ThWithButton"
import { IPagination, ISort, TStats } from "../../types"

const StatsTable = ({ stats, update, sort }: {
  stats: TStats[],
  update: (sort: ISort, pagination: IPagination) => any,
  sort: ISort
}): JSX.Element => (
  <TableContainer component={Paper} elevation={3}>
    <Table size="small">
      <TableHead>
        <TableRow>
          {tableHeaders.map(t => (
            <ThWithButton {...t} key={t.label} update={update} previousSort={sort} />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {stats.map((s: TStats) => (
          <Stats key={s.id} stats={s} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

const Stats = ({ stats }: {
  stats: TStats
}): JSX.Element => (
  <TableRow>
    <TableCell>
      <strong>
        {stats.year}-{stats.month}
      </strong>
    </TableCell>
    <TableCell>{stats.newUsers}</TableCell>
    <TableCell>{stats.newDiscs}</TableCell>
    <TableCell>{stats.newManufacturers}</TableCell>
    <TableCell>{stats.newMolds}</TableCell>
    <TableCell>{stats.newPlastics}</TableCell>
    <TableCell>{stats.salesCompleted}</TableCell>
  </TableRow>
)

const tableHeaders = [
  {
    label: "Kuukausi",
    sort: "year,desc&sort=month,desc",
  },
  {
    label: "Uudet käyttäjät",
    sort: "newUsers,desc",
  },
  {
    label: "Uudet kiekot",
    sort: "newDiscs,desc",
  },
  {
    label: "Uudet valmistajat",
    sort: "newManufacturers,desc",
  },
  {
    label: "Uudet moldit",
    sort: "newMolds,desc",
  },
  {
    label: "Uudet muovit",
    sort: "newPlastics,desc",
  },
  {
    label: "Myydyt kiekot",
    sort: "salesCompleted,desc",
  },
]

export default StatsTable
