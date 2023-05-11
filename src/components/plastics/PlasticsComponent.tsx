import React from "react"
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

import SelectManufacturerForm from "../shared/SelectManufacturerForm"
import Modal from "../shared/Modal"
import CreatePlasticForm from "./CreatePlasticForm"
import { defaultPagination } from "../shared/constants"
import { IPagination, ISelectedManufacturer, ISort, TDropdowns, TPlastic, TPlasticCreate } from "../../types"

const PlasticsComponent = ({
  props: { loggedIn, plastics, dropdowns, isPlasticCreateOpen, plasticSelectedManufacturer, plasticSort, plasticPagination },
  dispatch: { getPlastics, getPlasticsByManufacturer, togglePlasticCreateModal, createPlastic }
}: {
  props: {
    loggedIn: string | null,
    plastics: TPlastic[],
    dropdowns: TDropdowns,
    isPlasticCreateOpen: boolean,
    plasticSelectedManufacturer: ISelectedManufacturer,
    plasticSort: ISort,
    plasticPagination: IPagination
  },
  dispatch: {
    getPlastics: (sort: ISort, pagination: IPagination) => any,
    getPlasticsByManufacturer: (manufacturerId: number, sort: ISort, pagination: IPagination) => any,
    togglePlasticCreateModal: () => any,
    createPlastic: (plastic: TPlasticCreate) => any,
  }
}) => {
  const handleManufacturerSelection = manufacturerId => getPlasticsByManufacturer(manufacturerId, plasticSort, defaultPagination)

  const handlePageChange = (_event: unknown, newPage: number) => plasticSelectedManufacturer.id === undefined
    ? getPlastics(plasticSort, { ...plasticPagination, number: newPage })
    : getPlasticsByManufacturer(plasticSelectedManufacturer.id, plasticSort, { ...plasticPagination, number: newPage })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CreatePlasticModal
        isOpen={isPlasticCreateOpen}
        toggleModal={togglePlasticCreateModal}
        createPlastic={createPlastic}
        selectedManufacturer={plasticSelectedManufacturer}
      />
      <h2>Muovit</h2>
      <SelectManufacturerForm
        manufacturers={dropdowns.manufacturers}
        getByManufacturer={handleManufacturerSelection}
        manufacturerId={plasticSelectedManufacturer.id}
      />
      <Grid container spacing={1}>
        <Grid item md={4}>
          <Button
            variant="contained"
            onClick={() => togglePlasticCreateModal()}
            disabled={!plasticSelectedManufacturer.id}
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
              {plastics.map((p: TPlastic) => (
                <Plastic key={p.id} plastic={p} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="100%">
                  <TablePagination
                    component="div"
                    count={plasticPagination.totalElements}
                    rowsPerPageOptions={[plasticPagination.size]}
                    rowsPerPage={plasticPagination.size}
                    page={plasticPagination.number}
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
      {!loggedIn && <Navigate to="/" />}
    </Box>
  )
}

const CreatePlasticModal = ({ isOpen, toggleModal, createPlastic, selectedManufacturer }: {
  isOpen: boolean,
  toggleModal: () => any,
  createPlastic: (values: TPlasticCreate) => any,
  selectedManufacturer: ISelectedManufacturer
}) => (
  <Modal isOpen={isOpen} onRequestClose={() => toggleModal()} contentLabel="Uusi muovi">
    <CreatePlasticForm
      onSubmit={(values: TPlasticCreate) => createPlastic({ ...values, manufacturerId: selectedManufacturer.id })}
      selectedManufacturer={selectedManufacturer}
    />
  </Modal>
)

const Plastic = ({ plastic }: { plastic: TPlastic }) => (
  <TableRow key={plastic.id}>
    <TableCell>{plastic.id}</TableCell>
    <TableCell>{plastic.manufacturer.name}</TableCell>
    <TableCell>{plastic.name}</TableCell>
  </TableRow>
)

export default PlasticsComponent
