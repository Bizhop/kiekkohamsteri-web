import React, { useState } from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Box, Stack, Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

import {
  getDiscs,
  toggleEditModal,
  updateDisc,
  deleteDisc,
  getDiscSearchOperations,
  search,
  createDisc,
  updateImageApi,
} from "./discsActions"
import { getDropdowns, getDropdownsByManufacturer } from "../dropdown/dropdownActions"
import Modal from "../shared/Modal"
import DiscEditForm from "./DiscEditForm"
import DiscsTable from "./DiscsTable"
import { defaultSort, defaultPagination } from "../shared/constants"
import DiscsFilter from "./DiscsFilter"
import { base64Reader, resizeImage } from "../shared/utils"
import ImageCrop from "./ImageCrop"

const DiscsContainer = props => {
  const [newImage, setNewImage] = useState({ uuid: null, image: null })
  const [isImageCropOpen, setImageCropOpen] = useState(false)
  const [filters, setFilters] = useState([])

  const toggleImageCropModal = () => setImageCropOpen(!isImageCropOpen)

  const handleAcceptedFiles = ({ acceptedFiles, uuid }) => {
    if (acceptedFiles.length == 1) {
      const file = acceptedFiles[0]
      base64Reader(file).then(base64 => {
        setNewImage({ uuid, image: base64 })
        setImageCropOpen(true)
      })
    } else {
      console.log("Zero or more than one file sent")
    }
  }

  const resizeAndUpdateImage = (uuid, base64) => {
    resizeImage(base64).then(resizedImage => {
      props.updateImage(uuid, resizedImage)
      setImageCropOpen(false)
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DiscEditModal
        isOpen={props.isEditOpen}
        toggleModal={props.toggleEditModal}
        updateDisc={props.updateDisc}
        discInEdit={props.discInEdit}
        dropdowns={props.dropdowns}
        getDropdownsByManufacturer={props.getDropdownsByManufacturer}
      />
      <ImageCropModal
        isOpen={isImageCropOpen}
        imageUploading={props.imageUploading}
        toggleModal={toggleImageCropModal}
        newImage={newImage}
        updateImage={resizeAndUpdateImage}
      />
      <Stack direction="row" alignItems="center" spacing={3}>
        <h1>Kiekot</h1>
        <Button variant="contained" onClick={() => props.createDisc()} startIcon={<AddIcon />}>
          Uusi kiekko
        </Button>
      </Stack>
      <DiscsFilter
        searchOperations={props.searchOperations}
        search={props.search}
        sort={props.sort}
        pagination={props.pagination}
        filters={filters}
        setFilters={setFilters}
      />
      <DiscsTable
        discs={props.discs}
        search={props.search}
        toggleEditModal={props.toggleEditModal}
        deleteDisc={props.deleteDisc}
        editable={true}
        pagination={props.pagination}
        sort={props.sort}
        filters={filters}
        handleAcceptedFiles={handleAcceptedFiles}
        sortOptions={sortOptions}
      />
      {!props.loggedIn && <Navigate to="/" />}
    </Box>
  )
}

const sortOptions = [
  defaultSort,
  {
    column: "Paino",
    sort: "weight,desc"
  }
]

const DiscEditModal = ({
  isOpen,
  toggleModal,
  updateDisc,
  discInEdit,
  dropdowns,
  getDropdownsByManufacturer,
}) => (
  <Modal isOpen={isOpen} onRequestClose={() => toggleModal()} contentLabel="Kiekon muokkaus">
    <DiscEditForm
      onSubmit={updateDisc}
      initialValues={discInEdit}
      dropdowns={dropdowns}
      getDropdownsByManufacturer={getDropdownsByManufacturer}
    />
  </Modal>
)

const ImageCropModal = ({ isOpen, toggleModal, newImage, imageUploading, updateImage }) => (
  <Modal isOpen={isOpen} onRequestClose={() => toggleModal()} contentLabel="Kuvan rajaus">
    <ImageCrop image={newImage} imageUploading={imageUploading} updateImage={updateImage} />
  </Modal>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  discs: path(["discs", "discs"], state),
  isEditOpen: path(["discs", "isEditOpen"], state),
  discInEdit: path(["discs", "discInEdit"], state),
  dropdowns: path(["dropdowns", "dropdowns"], state),
  imageUploading: path(["discs", "imageUploading"], state),
  searchOperations: path(["discs", "searchOperations"], state),
  pagination: path(["discs", "pagination"], state),
  sort: path(["discs", "sort"], state)
})

const mapDispatchToProps = dispatch => ({
  getDiscs: dispatch(getDiscs(defaultSort, defaultPagination)),
  getDropdowns: dispatch(getDropdowns()),
  getDropdownsByManufacturer: manufacturerId =>
    dispatch(getDropdownsByManufacturer(manufacturerId)),
  getDiscSearchOperations: dispatch(getDiscSearchOperations()),
  updateDisc: disc => dispatch(updateDisc(disc)),
  createDisc: () => dispatch(createDisc()),
  toggleEditModal: disc => dispatch(toggleEditModal(disc)),
  deleteDisc: uuid => dispatch(deleteDisc(uuid)),
  search: (sort, pagination, criteria) => dispatch(search(sort, pagination, criteria)),
  updateImage: (uuid, base64) => dispatch(updateImageApi(uuid, base64))
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscsContainer)
