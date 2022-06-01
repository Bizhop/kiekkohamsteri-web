import React from "react"
import ReactImageMagnify from "react-image-magnify"

import ThWithButton from "../shared/ThWithButton"
import { imageUrl, magnify, check } from "../shared/images"
import { tussit } from "../shared/text"

const MyytavatTable = props => (
  <table className="table table-striped custom-table">
    <thead>
      <tr>
        {tableHeaders.map(t => (
          <ThWithButton
            {...t}
            key={t.label}
            update={props.updateMyytavat}
            sortColumn={props.sortColumn}
          />
        ))}
      </tr>
    </thead>
    <tbody>
      {props.kiekot.map(p => (
        <Kiekko
          key={p.id}
          kiekko={p}
          action={{ ...props.action, id: p.id }}
          username={props.username}
        />
      ))}
    </tbody>
  </table>
)

const Kiekko = props => {
  const kiekko = props.kiekko
  return (
    <tr>
      <td>
        <ReactImageMagnify {...magnify(kiekko.kuva)} />
      </td>
      <td>{kiekko.id}</td>
      <td>{kiekko.omistaja}</td>
      <td>{kiekko.hinta} €</td>
      <td>
        {kiekko.valmistaja} {kiekko.muovi} {kiekko.mold}
      </td>
      <td>
        {kiekko.nopeus} / {kiekko.liito} / {kiekko.vakaus} / {kiekko.feidi}
      </td>
      <td>{kiekko.kunto} / 10</td>
      <td>{tussit[kiekko.tussit - 1]}</td>
      <td>{kiekko.paino}</td>
      <td>{kiekko.dyed ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>{kiekko.hohto ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>{kiekko.swirly ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>{kiekko.spessu ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>
        <button
          className="btn btn-primary"
          disabled={kiekko.omistaja === props.username}
          onClick={() => props.action.action(props.action.id)}
        >
          {props.action.label}
        </button>
      </td>
    </tr>
  )
}

const tableHeaders = [
  {
    label: "Kuva"
  },
  {
    label: "Id",
    sort: "id,asc"
  },
  {
    label: "Omistaja",
    sort: "member.username,asc"
  },
  {
    label: "Hinta",
    sort: "hinta,asc"
  },
  {
    label: "Kiekko"
  },
  {
    label: "Lentonumerot"
  },
  {
    label: "Kunto"
  },
  {
    label: "Tussit"
  },
  {
    label: "Paino",
    sort: "paino,asc"
  },
  {
    label: "Dyed",
    sort: "dyed,desc"
  },
  {
    label: "Hohto",
    sort: "hohto,desc"
  },
  {
    label: "Swirly",
    sort: "swirly,desc"
  },
  {
    label: "Spessu",
    sort: "spessu,desc"
  },
  {
    label: "Osta"
  }
]

export default MyytavatTable
