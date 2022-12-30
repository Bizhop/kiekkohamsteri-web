import React from "react"
import { path, pathOr, length } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import Dropzone from "react-dropzone"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Box, Grid, Button, Stack } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"

import {
  getKiekot,
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
} from "./kiekkoActions"
import { getDropdowns, getDropdownsByValmistaja } from "../dropdown/dropdownActions"
import Modal from "../shared/Modal"
import KiekkoEditForm from "./KiekkoEditForm"
import KiekkoTable from "./KiekkoTable"
import { defaultSort, defaultPagination } from "../shared/constants"
import DiscFilter from "./DiscFilter"

const extractCropDimensions = crop => {
  if (typeof crop.width === "number" && typeof crop.height === "number") {
    return `${Math.round(crop.width)} x ${Math.round(crop.height)}`
  }
  return " x "
}

const KiekkoContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <KiekkoEditModal
      isOpen={props.isEditOpen}
      toggleModal={props.toggleEditModal}
      updateDisc={props.updateDisc}
      kiekkoInEdit={props.kiekkoInEdit}
      dropdowns={props.dropdowns}
      getDropdownsByValmistaja={props.getDropdownsByValmistaja}
      image={props.image}
    />
    <h1>Kuvan valinta</h1>
    <Grid container spacing={1} alignItems="center">
      <Grid item md={3}>
        <Dropzone onDrop={props.chooseImage}>{imageDropzone}</Dropzone>
      </Grid>
    </Grid>
    {props.image && (
      <div>
        <h2>Esikatselu</h2>
        <p>
          <strong>Kuvan alkuperäinen koko:</strong> {props.imageDimensions}
        </p>
        <p>
          <strong>Valinta-alue:</strong> {extractCropDimensions(props.crop)}
        </p>
        <Stack direction="column" spacing={1}>
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
          >
            <img src={props.image} />
          </ReactCrop>
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
      </div>
    )}
    <h1>Kiekot</h1>
    <DiscFilter
      searchOperations={props.searchOperations}
      search={props.search}
      sort={props.sort}
      pagination={props.pagination}
    />
    {!props.loggedIn && <Navigate to="/" />}
    <KiekkoTable
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
    />
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
    <KiekkoEditForm
      onSubmit={props.updateDisc}
      initialValues={props.kiekkoInEdit}
      dropdowns={props.dropdowns}
      getDropdownsByValmistaja={props.getDropdownsByValmistaja}
    />
  </Modal>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  kiekot: path(["kiekko", "kiekot"], state),
  isEditOpen: path(["kiekko", "isEditOpen"], state),
  kiekkoInEdit: path(["kiekko", "kiekkoInEdit"], state),
  dropdowns: path(["dropdowns", "dropdowns"], state),
  image: path(["kiekko", "image"], state),
  crop: path(["kiekko", "crop"], state),
  croppedImage: path(["kiekko", "croppedImage"], state),
  pixelCrop: path(["kiekko", "pixelCrop"], state),
  imageDimensions: path(["kiekko", "imageDimensions"], state),
  imageUploading: path(["kiekko", "imageUploading"], state),
  searchOperations: path(["kiekko", "searchOperations"], state),
  pagination: path(["kiekko", "pagination"], state),
  sort: path(["kiekko", "sort"], state),
  filters: path(["kiekko", "filters"], state),
})

const mapDispatchToProps = dispatch => ({
  getKiekot: dispatch(getKiekot({ sort: defaultSort, pagination: defaultPagination })),
  getDropdowns: dispatch(getDropdowns()),
  getDropdownsByValmistaja: valmId => dispatch(getDropdownsByValmistaja(valmId)),
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

export default connect(mapStateToProps, mapDispatchToProps)(KiekkoContainer)
