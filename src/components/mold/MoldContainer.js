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
  TableFooter,
  TablePagination
} from "@mui/material"

import { getMolds, getMoldsByManufacturer, toggleCreateModal, createMold } from "./moldActions"
import { getDropdowns } from "../dropdown/dropdownActions"
import SelectManufacturerForm from "../shared/SelectManufacturerForm"
import Modal from "../shared/Modal"
import CreateMoldForm from "./CreateMoldForm"
import { defaultPagination } from "../shared/constants"
import { defaultMoldSort } from "./moldReducer"

const MoldContainer = props => {
  const handleManufacturerSelection = manufacturerId => props.getMoldsByManufacturer(manufacturerId, props.sort, defaultPagination)

  const handlePageChange = (_, newPage) => props.selectedManufacturer.id == null
    ? props.getMolds(props.sort, { ...props.pagination, number: newPage })
    : props.getMoldsByManufacturer(props.selectedManufacturer.id, props.sort, { ...props.pagination, number: newPage })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MoldCreateModal
        isOpen={props.isCreateOpen}
        toggleModal={props.toggleCreateModal}
        createMold={props.createMold}
        selectedManufacturer={props.selectedManufacturer}
      />
      <h2>Mallit</h2>
      <SelectManufacturerForm
        manufacturers={pathOr([], ["dropdowns", "manufacturers"], props)}
        getByManufacturer={handleManufacturerSelection}
        manufacturerId={props.selectedManufacturer.id}
      />
      <Grid container spacing={1}>
        <Grid item md={4}>
          <Button
            variant="contained"
            onClick={() => props.toggleCreateModal()}
            disabled={!props.selectedManufacturer.id}
          >
            Uusi malli
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 3 }}>
        <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 800 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Valmistaja</TableCell>
                <TableCell>Malli</TableCell>
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
            <TableFooter>
              <TableRow>
                <TableCell colSpan="100%">
                  <TablePagination
                    component="div"
                    count={props.pagination.totalElements}
                    rowsPerPageOptions={[props.pagination.size]}
                    rowsPerPage={props.pagination.size}
                    page={props.pagination.number}
                    onPageChange={handlePageChange}
                    showFirstButton
                    showLastButton
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      {!props.loggedIn && <Navigate to="/" />}
    </Box>
  )
}

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
  molds: path(["mold", "molds"], state),
  dropdowns: path(["dropdowns", "dropdowns"], state),
  isCreateOpen: path(["mold", "isCreateOpen"], state),
  selectedManufacturer: path(["mold", "selectedManufacturer"], state),
  sort: path(["mold", "sort"], state),
  pagination: path(["mold", "pagination"], state),
})

const mapDispatchToProps = dispatch => ({
  getInitialMolds: dispatch(getMolds(defaultMoldSort, defaultPagination)),
  getMolds: (sort, pagination) => dispatch(getMolds(sort, pagination)),
  getDropdowns: dispatch(getDropdowns()),
  getMoldsByManufacturer: (manufacturerId, sort, pagination) => dispatch(getMoldsByManufacturer(manufacturerId, sort, pagination)),
  toggleCreateModal: () => dispatch(toggleCreateModal()),
  createMold: mold => dispatch(createMold(mold)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MoldContainer)
