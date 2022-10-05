import React from "react"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

import ThWithButton from "../shared/ThWithButton"

const StatsTable = props => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {tableHeaders.map(t => (
            <ThWithButton {...t} key={t.label} update={props.update} sortColumn={props.sortColumn} />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.stats.map(s => <Stats key={s.id} stats={s} />)}
      </TableBody>
    </Table>
  </TableContainer>
)

const Stats = props => {
  const stats = props.stats
  return (
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
}

const tableHeaders = [
  {
    label: "Kuukausi",
    sort: "year,desc&sort=month,desc"
  },
  {
    label: "Uudet käyttäjät",
    sort: "newUsers,desc"
  },
  {
    label: "Uudet kiekot",
    sort: "newDiscs,desc"
  },
  {
    label: "Uudet valmistajat",
    sort: "newManufacturers,desc"
  },
  {
    label: "Uudet moldit",
    sort: "newMolds,desc"
  },
  {
    label: "Uudet muovit",
    sort: "newPlastics,desc"
  },
  {
    label: "Myydyt kiekot",
    sort: "salesCompleted,desc"
  }
]

export default StatsTable
