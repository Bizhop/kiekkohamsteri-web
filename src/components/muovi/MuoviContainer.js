import React from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { getMuovit, getMuovitByValmistaja, toggleCreateModal, createMuovi } from "./muoviActions"
import { getDropdowns } from "../dropdown/dropdownActions"
import SelectValmistajaForm from "../shared/SelectValmistajaForm"
import Modal from "../shared/Modal"
import CreateMuoviForm from "./CreateMuoviForm"

const MuoviContainer = props => (
  <div className="container">
    <MuoviCreateModal
      isOpen={props.isCreateOpen}
      toggleModal={props.toggleCreateModal}
      createMuovi={props.createMuovi}
      valmId={props.valmId}
    />
    <h1>Muovit</h1>
    <SelectValmistajaForm
      valmistajat={pathOr([], ["dropdowns", "valms"], props)}
      getByValmistaja={props.getMuovitByValmistaja}
    />
    <div className="row">
      <div className="col-md-4">
        <div className="btn-group">
          <button
            className="btn btn-primary"
            onClick={() => props.toggleCreateModal()}
            disabled={props.valmId === null || props.valmId === ""}
          >
            Uusi muovi
          </button>
        </div>
      </div>
    </div>
    <table className="table table-striped custom-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Valmistaja</th>
          <th>Muovi</th>
        </tr>
      </thead>
      <tbody>{props.muovit.map(p => <Muovi key={p.id} muovi={p} />)}</tbody>
    </table>
    {!props.loggedIn && <Redirect to="/" />}
  </div>
)

const MuoviCreateModal = props => (
  <Modal isOpen={props.isOpen} onRequestClose={() => props.toggleModal()} contentLabel="Uusi muovi">
    <CreateMuoviForm onSubmit={props.createMuovi} initialValues={{ valmId: props.valmId }} />
  </Modal>
)

const Muovi = props => {
  const muovi = props.muovi
  return (
    <tr>
      <td>{muovi.id}</td>
      <td>{muovi.valmistaja}</td>
      <td>{muovi.muovi}</td>
    </tr>
  )
}

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  muovit: path(["muovi", "muovit", "content"], state),
  dropdowns: path(["dropdowns", "dropdowns"], state),
  isCreateOpen: path(["muovi", "isCreateOpen"], state),
  valmId: path(["muovi", "valmId"], state)
})

const mapDispatchToProps = dispatch => ({
  getMuovit: dispatch(getMuovit()),
  getDropdowns: dispatch(getDropdowns()),
  getMuovitByValmistaja: valmId => dispatch(getMuovitByValmistaja(valmId)),
  toggleCreateModal: () => dispatch(toggleCreateModal()),
  createMuovi: muovi => dispatch(createMuovi(muovi))
})

export default connect(mapStateToProps, mapDispatchToProps)(MuoviContainer)
