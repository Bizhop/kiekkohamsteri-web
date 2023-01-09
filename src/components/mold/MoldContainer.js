import React from "react"
import { pathOr, path } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import {
  Box,
  Button,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableHead,
} from "@mui/material"

import { getMolds, getMoldsByManufacturer, toggleCreateModal, createMold } from "./moldActions"
import { getDropdowns } from "../dropdown/dropdownActions"
import SelectManufacturerForm from "../shared/SelectManufacturerForm"
import Modal from "../shared/Modal"
import CreateMoldForm from "./CreateMoldForm"

const MoldContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <MoldCreateModal
      isOpen={props.isCreateOpen}
      toggleModal={props.toggleCreateModal}
      createMold={props.createMold}
      selectedManufacturer={props.selectedManufacturer}
    />
    <h2>Moldit</h2>
    <SelectManufacturerForm
      manufacturers={pathOr([], ["dropdowns", "manufacturers"], props)}
      getByManufacturer={props.getMoldsByManufacturer}
      manufacturerId={props.selectedManufacturer.id}
    />
    <Grid container spacing={1}>
      <Grid item md={4}>
        <Button
          variant="contained"
          onClick={() => props.toggleCreateModal()}
          disabled={!props.selectedManufacturer.id}
        >
          Uusi moldi
        </Button>
      </Grid>
    </Grid>
    <Box sx={{ marginTop: 3 }}>
      <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 800 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Valmistaja</TableCell>
              <TableCell>Kiekko</TableCell>
              <TableCell>Nopeus</TableCell>
              <TableCell>Liito</TableCell>
              <TableCell>Vakaus</TableCell>
              <TableCell>Feidi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.molds.map(p => (
              <Mold key={p.id} mold={p} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    {!props.loggedIn && <Navigate to="/" />}
  </Box>
)

const MoldCreateModal = ({ isOpen, toggleModal, createMold, selectedManufacturer }) => (
  <Modal isOpen={isOpen} onRequestClose={() => toggleModal()} contentLabel="Uusi moldi">
    <CreateMoldForm
      onSubmit={values => createMold({ ...values, manufacturerId: selectedManufacturer.id })}
      selectedManufacturer={selectedManufacturer}
    />
  </Modal>
)

const Mold = ({ mold }) => (
  <TableRow key={mold.id}>
    <TableCell>{mold.id}</TableCell>
    <TableCell>{mold.manufacturer.name}</TableCell>
    <TableCell>{mold.name}</TableCell>
    <TableCell>{mold.speed}</TableCell>
    <TableCell>{mold.glide}</TableCell>
    <TableCell>{mold.stability}</TableCell>
    <TableCell>{mold.fade}</TableCell>
  </TableRow>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  molds: path(["mold", "molds", "content"], state),
  dropdowns: path(["dropdowns", "dropdowns"], state),
  isCreateOpen: path(["mold", "isCreateOpen"], state),
  selectedManufacturer: path(["mold", "selectedManufacturer"], state),
})

const mapDispatchToProps = dispatch => ({
  getMolds: dispatch(getMolds()),
  getDropdowns: dispatch(getDropdowns()),
  getMoldsByManufacturer: manufacturerId => dispatch(getMoldsByManufacturer(manufacturerId)),
  toggleCreateModal: () => dispatch(toggleCreateModal()),
  createMold: mold => dispatch(createMold(mold)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MoldContainer)
