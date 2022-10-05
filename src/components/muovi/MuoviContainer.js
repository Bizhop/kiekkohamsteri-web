import React from "react"
import { path, pathOr } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Box, Button, Grid, TableContainer, Table, TableBody, TableRow, TableCell, Paper, TableHead } from "@mui/material"

import { getMuovit, getMuovitByValmistaja, toggleCreateModal, createMuovi } from "./muoviActions"
import { getDropdowns } from "../dropdown/dropdownActions"
import SelectValmistajaForm from "../shared/SelectValmistajaForm"
import Modal from "../shared/Modal"
import CreateMuoviForm from "./CreateMuoviForm"

const MuoviContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <MuoviCreateModal
      isOpen={props.isCreateOpen}
      toggleModal={props.toggleCreateModal}
      createMuovi={props.createMuovi}
      valmId={props.valmId}
    />
    <h2>Muovit</h2>
    <SelectValmistajaForm
      valmistajat={pathOr([], ["dropdowns", "valms"], props)}
      getByValmistaja={props.getMuovitByValmistaja}
      valmId={props.valmId}
    />
    <Grid container spacing={1}>
      <Grid item md={4}>
        <Button
          variant="contained"
          onClick={() => props.toggleCreateModal()}
          disabled={props.valmId === null || props.valmId === ""}
        >
          Uusi muovi
        </Button>
      </Grid>
    </Grid>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Valmistaja</TableCell>
            <TableCell>Muovi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.muovit.map(p => <Muovi key={p.id} muovi={p} />)}
        </TableBody>
      </Table>
    </TableContainer>
    {!props.loggedIn && <Navigate to="/" />}
  </Box>
)

const MuoviCreateModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={() => props.toggleModal()}
    contentLabel="Uusi muovi"
  >
    <CreateMuoviForm onSubmit={props.createMuovi} initialValues={{ valmId: props.valmId }} />
  </Modal>
)

const Muovi = props => {
  const muovi = props.muovi
  return (
    <TableRow key={muovi.id}>
      <TableCell>{muovi.id}</TableCell>
      <TableCell>{muovi.valmistaja}</TableCell>
      <TableCell>{muovi.muovi}</TableCell>
    </TableRow>
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
