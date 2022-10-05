import React from "react"
import { pathOr, path } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Box, Button, Grid, TableContainer, Table, TableBody, TableRow, TableCell, Paper, TableHead } from "@mui/material"

import { getMolds, getMoldsByValmistaja, toggleCreateModal, createMold } from "./moldActions"
import { getDropdowns } from "../dropdown/dropdownActions"
import SelectValmistajaForm from "../shared/SelectValmistajaForm"
import Modal from "../shared/Modal"
import CreateMoldForm from "./CreateMoldForm"

const MoldContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <MoldCreateModal
      isOpen={props.isCreateOpen}
      toggleModal={props.toggleCreateModal}
      createMold={props.createMold}
      valmId={props.valmId}
    />
    <h2>Moldit</h2>
    <SelectValmistajaForm
      valmistajat={pathOr([], ["dropdowns", "valms"], props)}
      getByValmistaja={props.getMoldsByValmistaja}
      valmId={props.valmId}
    />
    <Grid container spacing={1}>
      <Grid item md={4}>
        <Button
          variant="contained"
          onClick={() => props.toggleCreateModal()}
          disabled={props.valmId === null || props.valmId === ""}
        >
          Uusi moldi
        </Button>
      </Grid>
    </Grid>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <th>Id</th>
            <th>Valmistaja</th>
            <th>Kiekko</th>
            <th>Nopeus</th>
            <th>Liito</th>
            <th>Vakaus</th>
            <th>Feidi</th>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.molds.map(p => <Mold key={p.id} mold={p} />)}
        </TableBody>
      </Table>
    </TableContainer>
    {!props.loggedIn && <Navigate to="/" />}
  </Box>
)

const MoldCreateModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={() => props.toggleModal()}
    contentLabel="Uusi moldi"
  >
    <CreateMoldForm onSubmit={props.createMold} initialValues={{ valmId: props.valmId }} />
  </Modal>
)

const Mold = props => {
  const mold = props.mold
  return (
    <TableRow key={mold.id}>
      <TableCell>{mold.id}</TableCell>
      <TableCell>{mold.valmistaja}</TableCell>
      <TableCell>{mold.kiekko}</TableCell>
      <TableCell>{mold.nopeus}</TableCell>
      <TableCell>{mold.liito}</TableCell>
      <TableCell>{mold.vakaus}</TableCell>
      <TableCell>{mold.feidi}</TableCell>
    </TableRow>
  )
}

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  molds: path(["mold", "molds", "content"], state),
  dropdowns: path(["dropdowns", "dropdowns"], state),
  isCreateOpen: path(["mold", "isCreateOpen"], state),
  valmId: path(["mold", "valmId"], state)
})

const mapDispatchToProps = dispatch => ({
  getMolds: dispatch(getMolds()),
  getDropdowns: dispatch(getDropdowns()),
  getMoldsByValmistaja: valmId => dispatch(getMoldsByValmistaja(valmId)),
  toggleCreateModal: () => dispatch(toggleCreateModal()),
  createMold: mold => dispatch(createMold(mold))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoldContainer)
