import React from "react"
import { path, pathOr, length } from "ramda"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import Dropzone from "react-dropzone"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

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
import { upload } from "../shared/images"

const extractCropDimensions = crop => {
  if (typeof crop.width === 'number' && typeof crop.height === 'number') {
    return `${Math.round(crop.width)} x ${Math.round(crop.height)}`
  }
  return " x "
}

const KiekkoContainer = props => (
  <div className="container">
    <KiekkoEditModal
      isOpen={props.isEditOpen}
      toggleModal={props.toggleEditModal}
      updateDisc={props.updateDisc}
      kiekkoInEdit={props.kiekkoInEdit}
      dropdowns={props.dropdowns}
      getDropdownsByValmistaja={props.getDropdownsByValmistaja}
      editFormValues={props.editFormValues}
      image={props.image}
    />
    <h1>Kuvan valinta</h1>
    <div className="row mb-10">
      <div className="col-md-3">
        <Dropzone onDrop={props.chooseImage}>{imageDropzone}</Dropzone>
      </div>
      <div className="col-md-2">
        <button
          className="btn btn-primary btn-block"
          onClick={() => props.uploadImage(props.croppedImage)}
          disabled={props.image === null}
        >
          Luo uusi kiekko
        </button>
      </div>
    </div>
    <p><strong>Kiekon lisäys:</strong> valitse ensin kuva, tee rajaus ja paina nappia "Lisää uusi kiekko"</p>
    <p>
      <strong>Kuvan päivitys:</strong> valitse ensin kuva, tee rajaus ja paina sitten haluamasi kiekon kohdalta
      upload-nappia <img alt="kuva" src={upload} />
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
          onComplete={props.completeCrop}
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
    {!props.loggedIn && <Redirect to="/" />}
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
  </div>
)

const imageDropzone = ({getRootProps, getInputProps}) => (
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
      editFormValues={props.editFormValues}
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
  editFormValues: path(["form", "kiekkoEditForm", "values"], state),
  predicates: path(["kiekko", "predicates"], state),
  image: path(["kiekko", "image"], state),
  crop: path(["kiekko", "crop"], state),
  croppedImage: path(["kiekko", "croppedImage"], state),
  pixelCrop: path(["kiekko", "pixelCrop"], state),
  imageDimensions: path(["kiekko", "imageDimensions"], state)
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
  completeCrop: (crop, pixelCrop) => dispatch(completeCrop(crop, pixelCrop)),
  updateImage: params => dispatch(updateImage(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(KiekkoContainer)
