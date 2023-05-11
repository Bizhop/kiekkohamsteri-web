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
import CreateMoldForm from "./CreateMoldForm"
import { defaultPagination } from "../shared/constants"
import { IPagination, ISelectedManufacturer, ISort, TDropdowns, TMold, TMoldCreate } from "../../types"

const MoldsComponent = ({ 
  props: { loggedIn, molds, dropdowns, isMoldCreateOpen, moldSelectedManufacturer, moldSort, moldPagination },
  dispatch: { getMolds, getMoldsByManufacturer, toggleMoldCreateModal, createMold }
}: {
  props: {
    loggedIn: string | null,
    molds: TMold[],
    dropdowns: TDropdowns,
    isMoldCreateOpen: boolean,
    moldSelectedManufacturer: ISelectedManufacturer,
    moldSort: ISort,
    moldPagination: IPagination
  },
  dispatch: {
    getMolds: (sort: ISort, pagination: IPagination) => any,
    getMoldsByManufacturer: (manufacturerId: number, sort: ISort, pagination: IPagination) => any,
    toggleMoldCreateModal: () => any,
    createMold: (mold: TMoldCreate) => any,
  }
}) => {
  const handleManufacturerSelection = (manufacturerId: number) => getMoldsByManufacturer(manufacturerId, moldSort, defaultPagination)

  const handlePageChange = (_event: unknown, newPage: number) => moldSelectedManufacturer.id === undefined
    ? getMolds(moldSort, { ...moldPagination, number: newPage })
    : getMoldsByManufacturer(moldSelectedManufacturer.id, moldSort, { ...moldPagination, number: newPage })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MoldCreateModal
        isOpen={isMoldCreateOpen}
        toggleModal={toggleMoldCreateModal}
        createMold={createMold}
        selectedManufacturer={moldSelectedManufacturer}
      />
      <h2>Mallit</h2>
      <SelectManufacturerForm
        manufacturers={dropdowns.manufacturers}
        getByManufacturer={handleManufacturerSelection}
        manufacturerId={moldSelectedManufacturer.id}
      />
      <Grid container spacing={1}>
        <Grid item md={4}>
          <Button
            variant="contained"
            onClick={() => toggleMoldCreateModal()}
            disabled={!moldSelectedManufacturer.id}
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
              {molds.map((m: TMold) => (
                <Mold key={m.id} mold={m} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="100%">
                  <TablePagination
                    component="div"
                    count={moldPagination.totalElements}
                    rowsPerPageOptions={[moldPagination.size]}
                    rowsPerPage={moldPagination.size}
                    page={moldPagination.number}
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

const MoldCreateModal = ({ isOpen, toggleModal, createMold, selectedManufacturer }: {
  isOpen: boolean,
  toggleModal: () => any,
  createMold: (values: TMoldCreate) => any,
  selectedManufacturer: ISelectedManufacturer
}) => (
  <Modal isOpen={isOpen} onRequestClose={() => toggleModal()} contentLabel="Uusi malli">
    <CreateMoldForm
      onSubmit={(values: TMoldCreate) => createMold({ ...values, manufacturerId: selectedManufacturer.id })}
      selectedManufacturer={selectedManufacturer}
    />
  </Modal>
)

const Mold = ({ mold }: { mold: TMold }) => (
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

export default MoldsComponent
