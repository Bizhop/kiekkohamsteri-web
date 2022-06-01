import React from "react"

import ThWithButton from "../shared/ThWithButton"

const LeaderTable = props => (
  <table className="table table-striped">
    <thead>
      <tr>{tableHeaders.map(t => <ThWithButton {...t} key={t.label} />)}</tr>
    </thead>
    <tbody>{props.leaders.map(p => <Leader key={p.username} leader={p} />)}</tbody>
  </table>
)

const Leader = props => {
  const leader = props.leader
  return (
    <tr>
      <td>{leader.username}</td>
      <td>{leader.discCount}</td>
    </tr>
  )
}

const tableHeaders = [
  {
    label: "Nimi"
  },
  {
    label: "Lkm"
  }
]

export default LeaderTable
