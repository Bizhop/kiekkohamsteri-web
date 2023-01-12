import React, { useState } from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import Dropzone from "react-dropzone"
import { Box, Stack, Button } from "@mui/material"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"

import {
  getDiscs,
  toggleEditModal,
  updateDisc,
  uploadImageApi,
  deleteDisc,
  getDiscSearchOperations,
  search,
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
  const [newImage, setNewImage] = useState({ id: null, image: null })
  const [isImageCropOpen, setImageCropOpen] = useState(false)
  const [filters, setFilters] = useState([])

  const toggleImageCropModal = () => setImageCropOpen(!isImageCropOpen)

  const handleAcceptedFiles = ({ acceptedFiles, id }) => {
    if (acceptedFiles.length == 1) {
      const file = acceptedFiles[0]
      base64Reader(file).then(base64 => {
        setNewImage({ id, image: base64 })
        setImageCropOpen(true)
      })
    } else {
      console.log("Zero or more than one file sent")
    }
  }

  const resizeAndUploadImage = base64 => {
    resizeImage(base64).then(resizedImage => {
      props.uploadImage(resizedImage)
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
        uploadImage={resizeAndUploadImage}
      />
      <Stack direction="row" alignItems="center" spacing={3}>
        <h1>Kiekot</h1>
        <Dropzone onDrop={acceptedFiles => handleAcceptedFiles({ id: null, acceptedFiles })}>
          {imageDropzone}
        </Dropzone>
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
        imageDropzone={imageDropzone}
      />
      {!props.loggedIn && <Navigate to="/" />}
    </Box>
  )
}

const imageDropzone = ({ getRootProps, getInputProps }) => {
  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant="contained" startIcon={<AddAPhotoIcon />}>
        Uusi kiekko
      </Button>
    </div>
  )
}

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

const ImageCropModal = ({ isOpen, toggleModal, newImage, imageUploading, uploadImage }) => (
  <Modal isOpen={isOpen} onRequestClose={() => toggleModal()} contentLabel="Kuvan rajaus">
    <ImageCrop image={newImage} imageUploading={imageUploading} uploadImage={uploadImage} />
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
  getDiscs: dispatch(getDiscs({ sort: defaultSort, pagination: defaultPagination })),
  getDropdowns: dispatch(getDropdowns()),
  getDropdownsByManufacturer: manufacturerId =>
    dispatch(getDropdownsByManufacturer(manufacturerId)),
  getDiscSearchOperations: dispatch(getDiscSearchOperations()),
  updateDisc: disc => dispatch(updateDisc(disc)),
  toggleEditModal: disc => dispatch(toggleEditModal(disc)),
  uploadImage: data => dispatch(uploadImageApi(data)),
  deleteDisc: id => dispatch(deleteDisc(id)),
  search: params => dispatch(search(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscsContainer)
