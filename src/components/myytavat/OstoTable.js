import React from "react"
import ReactImageMagnify from "react-image-magnify"

import ThWithButton from "../shared/ThWithButton"
import { imageUrl, magnify, check } from "../shared/images"

const OstoTable = props => (
  <table className="table table-striped">
    <thead>
      <tr>{tableHeaders.map(t => <ThWithButton {...t} key={t.label} />)}</tr>
    </thead>
    <tbody>{props.ostot.map(p => <Osto key={p.id} osto={p} action={props.action} />)}</tbody>
  </table>
)

const Osto = props => {
  const kiekko = props.osto.kiekko
  return (
    <tr>
      <td>
        <ReactImageMagnify {...magnify(kiekko.kuva)} />
      </td>
      <td>{props.osto.id}</td>
      <td>{props.osto.myyja.username}</td>
      <td>{kiekko.hinta} €</td>
      <td>
        {kiekko.mold.valmistaja.valmistaja} {kiekko.muovi.muovi} {kiekko.mold.kiekko}
      </td>
      <td>
        {kiekko.mold.nopeus} / {kiekko.mold.liito} / {kiekko.mold.vakaus} / {kiekko.mold.feidi}
      </td>
      <td>{kiekko.kunto} / 10</td>
      <td>{kiekko.paino}</td>
      <td>{kiekko.dyed ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>{kiekko.hohto ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>{kiekko.swirly ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>{kiekko.spessu ? <img className="on-table" src={check} alt="" /> : ""}</td>
      <td>
        <button className="btn btn-primary" onClick={() => props.action.action(props.osto.id)}>
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
    label: "Id"
  },
  {
    label: "Myyjä"
  },
  {
    label: "Hinta"
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
    label: "Paino"
  },
  {
    label: "Dyed"
  },
  {
    label: "Hohto"
  },
  {
    label: "Swirly"
  },
  {
    label: "Spessu"
  },
  {
    label: "Peruuta"
  }
]

export default OstoTable
