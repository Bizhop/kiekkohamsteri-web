import React from "react"

import ThWithButton from "../shared/ThWithButton"

const StatsTable = props => (
  <table className="table table-striped">
    <thead>
      <tr>
        {tableHeaders.map(t => (
          <ThWithButton {...t} key={t.label} update={props.update} sortColumn={props.sortColumn} />
        ))}
      </tr>
    </thead>
    <tbody>{props.stats.map(s => <Stats key={s.id} stats={s} />)}</tbody>
  </table>
)

const Stats = props => {
  const stats = props.stats
  return (
    <tr>
      <td>
        <strong>
          {stats.year}-{stats.month}
        </strong>
      </td>
      <td>{stats.newUsers}</td>
      <td>{stats.newDiscs}</td>
      <td>{stats.newManufacturers}</td>
      <td>{stats.newMolds}</td>
      <td>{stats.newPlastics}</td>
      <td>{stats.salesCompleted}</td>
    </tr>
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
