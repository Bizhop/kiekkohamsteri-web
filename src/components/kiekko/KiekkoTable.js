import React from "react"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { NavLink } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"

import ThWithButton from "../shared/ThWithButton"
import { edit, del, magnify, upload, check } from "../shared/images"
import { defaultSort } from "../shared/text"
import ZoomImage from "../shared/ZoomImage"

const KiekkoTable = props => (
  <div>
    {props.kiekot ? (
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            {tableHeaders.map(t => (
              <ThWithButton
                {...t}
                key={t.label}
                update={props.updateKiekot}
                sortColumn={props.sortColumn}
              />
            ))}
            {props.lostDiscs && (
              <ThWithButton
                label="Pvm"
                sort="createdAt,desc"
                update={props.updateKiekot}
                sortColumn={props.sortColumn}
              />
            )}
            {props.lostDiscs && <ThWithButton label="Löytynyt" />}
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {props.kiekot.map(p => (
            <Kiekko
              key={p.id}
              kiekko={p}
              toggleEditModal={props.toggleEditModal}
              deleteDisc={props.deleteDisc}
              updateImage={props.updateImage}
              image={props.image}
              editable={props.editable}
              lostDiscs={props.lostDiscs}
              username={props.username}
              found={props.found}
            />
          ))}
        </tbody>
      </table>
    ) : (
      <Spinner />
    )}
  </div>
)

const Kiekko = props => {
  const kiekko = props.kiekko
  return (
    <tr>
      <td>
        <ZoomImage image={kiekko.kuva} />
      </td>
      <td>
        <NavLink
          to={`/kiekot/${kiekko.id}`}
          target="_disc"
          className="nav-link nav-item"
        >
          {kiekko.id}
        </NavLink>
      </td>
      <td>{kiekko.valmistaja}</td>
      <td>{kiekko.mold}</td>
      <td>{kiekko.muovi}</td>
      <td>{kiekko.nopeus}</td>
      <td>{kiekko.liito}</td>
      <td>{kiekko.vakaus}</td>
      <td>{kiekko.feidi}</td>
      <td>{kiekko.paino}</td>
      {props.lostDiscs && <td>{kiekko.createdAt}</td>}
      {props.lostDiscs && (
        <td>
          {props.username === kiekko.omistaja && (
            <input
              type="image"
              alt="found"
              src={check}
              height="15"
              width="15"
              onClick={() => props.found(kiekko.id)}
            />
          )}
        </td>
      )}
      <td>
        {props.editable && (
          <input
            type="image"
            alt="upload"
            src={upload}
            height="15"
            width="15"
            disabled={props.image === null}
            onClick={() =>
              props.updateImage({
                id: kiekko.id,
                image: props.image
              })}
          />
        )}
      </td>
      <td>
        {props.editable && (
          <input
            type="image"
            alt="edit"
            src={edit}
            height="15"
            width="15"
            onClick={() => props.toggleEditModal(kiekko)}
          />
        )}
      </td>
      <td>
        {props.editable && (
          <input
            type="image"
            alt="delete"
            src={del}
            height="15"
            width="15"
            onClick={() =>
              handleDelete({
                id: kiekko.id,
                confirm: props.deleteDisc
              })}
          />
        )}
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
    sort: "id,desc"
  },
  {
    label: "Valmistaja",
    sort: defaultSort.sort
  },
  {
    label: "Mold",
    sort: "mold.kiekko,asc"
  },
  {
    label: "Muovi",
    sort: "muovi.muovi,asc"
  },
  {
    label: "Nopeus",
    sort: "mold.nopeus,desc"
  },
  {
    label: "Liito",
    sort: "mold.liito,desc"
  },
  {
    label: "Vakaus",
    sort: "mold.vakaus,asc"
  },
  {
    label: "Feidi",
    sort: "mold.feidi,asc"
  },
  {
    label: "Paino",
    sort: "paino,desc"
  }
]

const handleDelete = params => {
  confirmAlert({
    title: "Varoitus",
    message: "Haluatko varmasti poistaa kiekon?",
    buttons: [
      {
        label: "Poista",
        onClick: () => params.confirm(params.id),
        className: "red-button"
      },
      {
        label: "Peruuta"
      }
    ]
  })
}

export default KiekkoTable
