import React from "react"
import { path } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import Dropzone from "react-dropzone"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Box, Button, Stack, Paper } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"

import {
  getDiscs,
  toggleEditModal,
  updateDisc,
  chooseImage,
  uploadImage,
  deleteDisc,
  updateCrop,
  completeCrop,
  updateImage,
  cancelImageSelection,
  getDiscSearchOperations,
  search,
} from "./discsActions"
import { getDropdowns, getDropdownsByManufacturer } from "../dropdown/dropdownActions"
import Modal from "../shared/Modal"
import DiscEditForm from "./DiscEditForm"
import DiscsTable from "./DiscsTable"
import { defaultSort, defaultPagination } from "../shared/constants"
import DiscsFilter from "./DiscsFilter"

const extractCropDimensions = crop => {
  if (typeof crop.width === "number" && typeof crop.height === "number") {
    return `${Math.round(crop.width)} x ${Math.round(crop.height)}`
  }
  return " x "
}

const DiscsContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <KiekkoEditModal
      isOpen={props.isEditOpen}
      toggleModal={props.toggleEditModal}
      updateDisc={props.updateDisc}
      kiekkoInEdit={props.kiekkoInEdit}
      dropdowns={props.dropdowns}
      getDropdownsByManufacturer={props.getDropdownsByManufacturer}
      image={props.image}
    />
    <Stack direction="row" alignItems="center" spacing={3}>
      <h1>Kiekot</h1>
      <Dropzone onDrop={props.chooseImage}>{imageDropzone}</Dropzone>
    </Stack>
    {props.image && (
      <Box component={Paper} elevation={3} padding={1}>
        <h2>Esikatselu</h2>
        <p>
          <strong>Kuvan alkuperäinen koko:</strong> {props.imageDimensions}
        </p>
        <p>
          <strong>Valinta-alue:</strong> {extractCropDimensions(props.crop)}
        </p>
        <Stack direction="column" spacing={1} marginBottom={1} paddingBottom={10}>
          <Stack direction="row" spacing={1}>
            <ReactCrop
              onChange={(crop, _) => props.updateCrop(crop)}
              crop={props.crop}
              onComplete={(crop, _) =>
                props.completeCrop({
                  crop: crop,
                  image: props.image,
                })
              }
              aspect={1}
              style={{ border: "2px solid grey" }}
            >
              <img src={props.image} />
            </ReactCrop>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={() => props.uploadImage(props.croppedImage)}
              disabled={props.croppedImage === null || props.imageUploading}
            >
              Luo uusi kiekko
            </Button>
            <Button variant="contained" color="error" onClick={() => props.cancelImageSelection()}>
              Peruuta
            </Button>
          </Stack>
        </Stack>
      </Box>
    )}
    {!props.image && <DiscsFilter
      searchOperations={props.searchOperations}
      search={props.search}
      sort={props.sort}
      pagination={props.pagination}
    />}
    {!props.image && <DiscsTable
      kiekot={props.kiekot}
      search={props.search}
      toggleEditModal={props.toggleEditModal}
      deleteDisc={props.deleteDisc}
      updateImage={props.updateImage}
      image={props.croppedImage}
      editable={true}
      pagination={props.pagination}
      sort={props.sort}
      filters={props.filters}
    />}
    {!props.loggedIn && <Navigate to="/" />}
  </Box>
)

const imageDropzone = ({ getRootProps, getInputProps }) => {
  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant="contained" startIcon={<AddAPhotoIcon />}>
        Lisää kuva
      </Button>
    </div>
  )
}

const KiekkoEditModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={() => props.toggleModal()}
    contentLabel="Kiekon muokkaus"
  >
    <DiscEditForm
      onSubmit={props.updateDisc}
      initialValues={props.kiekkoInEdit}
      dropdowns={props.dropdowns}
      getDropdownsByManufacturer={props.getDropdownsByManufacturer}
    />
  </Modal>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  kiekot: path(["discs", "kiekot"], state),
  isEditOpen: path(["discs", "isEditOpen"], state),
  kiekkoInEdit: path(["discs", "kiekkoInEdit"], state),
  dropdowns: path(["dropdowns", "dropdowns"], state),
  image: path(["discs", "image"], state),
  crop: path(["discs", "crop"], state),
  croppedImage: path(["discs", "croppedImage"], state),
  imageDimensions: path(["discs", "imageDimensions"], state),
  imageUploading: path(["discs", "imageUploading"], state),
  searchOperations: path(["discs", "searchOperations"], state),
  pagination: path(["discs", "pagination"], state),
  sort: path(["discs", "sort"], state),
  filters: path(["discs", "filters"], state),
})

const mapDispatchToProps = dispatch => ({
  getDiscs: dispatch(getDiscs({ sort: defaultSort, pagination: defaultPagination })),
  getDropdowns: dispatch(getDropdowns()),
  getDropdownsByManufacturer: manufacturerId => dispatch(getDropdownsByManufacturer(manufacturerId)),
  getDiscSearchOperations: dispatch(getDiscSearchOperations()),
  updateDisc: disc => dispatch(updateDisc(disc)),
  toggleEditModal: kiekko => dispatch(toggleEditModal(kiekko)),
  chooseImage: acceptedFiles => dispatch(chooseImage(acceptedFiles)),
  uploadImage: data => dispatch(uploadImage(data)),
  deleteDisc: id => dispatch(deleteDisc(id)),
  updateCrop: crop => dispatch(updateCrop(crop)),
  completeCrop: params => dispatch(completeCrop(params)),
  updateImage: params => dispatch(updateImage(params)),
  cancelImageSelection: () => dispatch(cancelImageSelection()),
  search: params => dispatch(search(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscsContainer)
