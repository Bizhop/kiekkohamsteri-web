import React from "react"
import { path, pathOr } from "ramda"
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

import {
  getPlastics,
  getPlasticsByManufacturer,
  toggleCreateModal,
  createPlastic,
} from "./plasticsActions"
import { getDropdowns } from "../dropdown/dropdownActions"
import SelectManufacturerForm from "../shared/SelectManufacturerForm"
import Modal from "../shared/Modal"
import CreatePlasticForm from "./CreatePlasticForm"

const PlasticsContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <CreatePlasticModal
      isOpen={props.isCreateOpen}
      toggleModal={props.toggleCreateModal}
      createPlastic={props.createPlastic}
      selectedManufacturer={props.selectedManufacturer}
    />
    <h2>Muovit</h2>
    <SelectManufacturerForm
      manufacturers={pathOr([], ["dropdowns", "manufacturers"], props)}
      getByManufacturer={props.getPlasticsByManufacturer}
      manufacturerId={props.selectedManufacturer.id}
    />
    <Grid container spacing={1}>
      <Grid item md={4}>
        <Button
          variant="contained"
          onClick={() => props.toggleCreateModal()}
          disabled={!props.selectedManufacturer.id}
        >
          Uusi muovi
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
              <TableCell>Muovi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.plastics.map(p => (
              <Plastic key={p.id} plastic={p} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    {!props.loggedIn && <Navigate to="/" />}
  </Box>
)

const CreatePlasticModal = ({ isOpen, toggleModal, createPlastic, selectedManufacturer }) => (
  <Modal isOpen={isOpen} onRequestClose={() => toggleModal()} contentLabel="Uusi muovi">
    <CreatePlasticForm
      onSubmit={values => createPlastic({ ...values, manufacturerId: selectedManufacturer.id })}
      selectedManufacturer={selectedManufacturer}
    />
  </Modal>
)

const Plastic = ({ plastic }) => (
  <TableRow key={plastic.id}>
    <TableCell>{plastic.id}</TableCell>
    <TableCell>{plastic.manufacturer.name}</TableCell>
    <TableCell>{plastic.name}</TableCell>
  </TableRow>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  plastics: path(["plastic", "plastics", "content"], state),
  dropdowns: path(["dropdowns", "dropdowns"], state),
  isCreateOpen: path(["plastic", "isCreateOpen"], state),
  selectedManufacturer: path(["plastic", "selectedManufacturer"], state),
})

const mapDispatchToProps = dispatch => ({
  getPlastics: dispatch(getPlastics()),
  getDropdowns: dispatch(getDropdowns()),
  getPlasticsByManufacturer: manufacturerId => dispatch(getPlasticsByManufacturer(manufacturerId)),
  toggleCreateModal: () => dispatch(toggleCreateModal()),
  createPlastic: plastic => dispatch(createPlastic(plastic)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlasticsContainer)
