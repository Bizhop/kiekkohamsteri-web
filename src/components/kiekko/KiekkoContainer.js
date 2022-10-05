import React from "react"
import { path, pathOr, length } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import Dropzone from "react-dropzone"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Box, Grid, Button } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

import {
  getKiekot,
  toggleEditModal,
  updateDisc,
  chooseImage,
  uploadImage,
  deleteDisc,
  applyPredicates,
  updateCrop,
  completeCrop,
  updateImage
} from "./kiekkoActions"
import { getDropdowns, getDropdownsByValmistaja } from "../dropdown/dropdownActions"
import Modal from "../shared/Modal"
import KiekkoEditForm from "./KiekkoEditForm"
import PredicatesForm from "./PredicatesForm"
import KiekkoTable from "./KiekkoTable"
import { defaultSort } from "../shared/text"

const extractCropDimensions = crop => {
  if (typeof crop.width === 'number' && typeof crop.height === 'number') {
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
    <Grid container spacing={1}>
      <Grid item md={3}>
        <Dropzone onDrop={props.chooseImage}>{imageDropzone}</Dropzone>
      </Grid>
      <Grid item md={2}>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={() => props.uploadImage(props.croppedImage)}
          disabled={props.image === null || props.croppedImage === null || props.imageUploading}
        >
          Luo uusi kiekko
        </Button>
      </Grid>
    </Grid>
    <p><strong>Kiekon lisäys:</strong> valitse ensin kuva, tee rajaus ja paina nappia "Lisää uusi kiekko"</p>
    <p>
      <strong>Kuvan päivitys:</strong> valitse ensin kuva, tee rajaus ja paina sitten haluamasi kiekon kohdalta
      upload-nappia <CloudUploadIcon />
    </p>
    {props.image && (
      <div>
        <h2>Esikatselu</h2>
        <p>
          <strong>Kuvan alkuperäinen koko:</strong> {props.imageDimensions}
        </p>
        <p>
          <strong>Valinta-alue:</strong> {extractCropDimensions(props.crop)}
        </p>
        <ReactCrop
          onChange={(crop, _) => props.updateCrop(crop)}
          crop={props.crop}
          onComplete={(crop, _) => props.completeCrop({
            crop: crop,
            image: props.image
          })}
          aspect={1}
        >
          <img src={props.image} />
        </ReactCrop>
      </div>
    )}
    <h1>
      Kiekot ({props.totalFiltered} / {props.total})
    </h1>
    <PredicatesForm onSubmit={props.applyPredicates} />
    {!props.loggedIn && <Navigate to="/" />}
    <KiekkoTable
      kiekot={props.kiekot}
      updateKiekot={props.updateKiekot}
      toggleEditModal={props.toggleEditModal}
      deleteDisc={props.deleteDisc}
      sortColumn={props.sortColumn}
      updateImage={props.updateImage}
      image={props.croppedImage}
      editable={true}
    />
  </Box>
)

const imageDropzone = ({ getRootProps, getInputProps }) => (
  <div {...getRootProps()}>
    <input {...getInputProps()} />
    <p className="choose-file">Raahaa tiedosto tähän tai klikkaa...</p>
  </div>
)

const KiekkoEditModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={() => props.toggleModal(null)}
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
  kiekot: path(["kiekko", "kiekotFiltered"], state),
  total: length(pathOr([], ["kiekko", "kiekot"], state)),
  totalFiltered: length(pathOr([], ["kiekko", "kiekotFiltered"], state)),
  sortColumn: path(["kiekko", "sortColumn"], state),
  isEditOpen: path(["kiekko", "isEditOpen"], state),
  kiekkoInEdit: path(["kiekko", "kiekkoInEdit"], state),
  dropdowns: path(["dropdowns", "dropdowns"], state),
  predicates: path(["kiekko", "predicates"], state),
  image: path(["kiekko", "image"], state),
  crop: path(["kiekko", "crop"], state),
  croppedImage: path(["kiekko", "croppedImage"], state),
  pixelCrop: path(["kiekko", "pixelCrop"], state),
  imageDimensions: path(["kiekko", "imageDimensions"], state),
  imageUploading: path(["kiekko", "imageUploading"], state)
})

const mapDispatchToProps = dispatch => ({
  getKiekot: dispatch(getKiekot(defaultSort)),
  updateKiekot: params => dispatch(getKiekot(params)),
  getDropdowns: dispatch(getDropdowns()),
  getDropdownsByValmistaja: valmId => dispatch(getDropdownsByValmistaja(valmId)),
  updateDisc: kiekko => dispatch(updateDisc(kiekko)),
  toggleEditModal: kiekko => dispatch(toggleEditModal(kiekko)),
  chooseImage: acceptedFiles => dispatch(chooseImage(acceptedFiles)),
  uploadImage: data => dispatch(uploadImage(data)),
  deleteDisc: id => dispatch(deleteDisc(id)),
  applyPredicates: form => dispatch(applyPredicates(form)),
  updateCrop: crop => dispatch(updateCrop(crop)),
  completeCrop: params => dispatch(completeCrop(params)),
  updateImage: params => dispatch(updateImage(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(KiekkoContainer)
