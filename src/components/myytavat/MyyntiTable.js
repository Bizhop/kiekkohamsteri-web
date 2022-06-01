import React from "react"
import ReactImageMagnify from "react-image-magnify"

import ThWithButton from "../shared/ThWithButton"
import { imageUrl, magnify, check } from "../shared/images"

const MyyntiTable = props => (
  <table className="table table-striped">
    <thead>
      <tr>{tableHeaders.map(t => <ThWithButton {...t} key={t.label} />)}</tr>
    </thead>
    <tbody>
      {props.myynnit.map(p => (
        <Myynti key={p.id} myynti={p} accept={props.accept} cancel={props.cancel} />
      ))}
    </tbody>
  </table>
)

const Myynti = props => {
  const kiekko = props.myynti.kiekko
  return (
    <tr>
      <td>
        <ReactImageMagnify {...magnify(kiekko.kuva)} />
      </td>
      <td>{props.myynti.id}</td>
      <td>{props.myynti.ostaja.username}</td>
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
        <button className="btn btn-primary" onClick={() => props.accept.action(props.myynti.id)}>
          {props.accept.label}
        </button>
      </td>
      <td>
        <button className="btn btn-primary" onClick={() => props.cancel.action(props.myynti.id)}>
          {props.cancel.label}
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
    label: "Ostaja"
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
    label: "Hyväksy"
  },
  {
    label: "Peruuta"
  }
]

export default MyyntiTable
