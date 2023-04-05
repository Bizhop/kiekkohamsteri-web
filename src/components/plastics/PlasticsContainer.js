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
  TableFooter,
  TablePagination
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
import { defaultPagination } from "../shared/constants"
import { defaultPlasticSort } from "./plasticsReducer"

const PlasticsContainer = props => {
  const handleManufacturerSelection = manufacturerId => props.getPlasticsByManufacturer(manufacturerId, props.sort, defaultPagination)

  const handlePageChange = (_, newPage) => props.selectedManufacturer.id == null
    ? props.getPlastics(props.sort, { ...props.pagination, number: newPage })
    : props.getPlasticsByManufacturer(props.selectedManufacturer.id, props.sort, { ...props.pagination, number: newPage })

  return (
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
            Uusi muovi
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
                <TableCell>Muovi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.plastics.map(p => (
                <Plastic key={p.id} plastic={p} />
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
  plastics: path(["plastic", "plastics"], state),
  dropdowns: path(["dropdowns", "dropdowns"], state),
  isCreateOpen: path(["plastic", "isCreateOpen"], state),
  selectedManufacturer: path(["plastic", "selectedManufacturer"], state),
  sort: path(["plastic", "sort"], state),
  pagination: path(["plastic", "pagination"], state),
})

const mapDispatchToProps = dispatch => ({
  getInitialPlastics: dispatch(getPlastics(defaultPlasticSort, defaultPagination)),
  getPlastics: (sort, pagination) => dispatch(getPlastics(sort, pagination)),
  getDropdowns: dispatch(getDropdowns()),
  getPlasticsByManufacturer: (manufacturerId, sort, pagination) => dispatch(getPlasticsByManufacturer(manufacturerId, sort, pagination)),
  toggleCreateModal: () => dispatch(toggleCreateModal()),
  createPlastic: plastic => dispatch(createPlastic(plastic)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlasticsContainer)
