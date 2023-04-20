import React, { useState } from "react"
import { path } from "ramda"
import { ConnectedProps, connect } from "react-redux"
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
import { IDiscsState, IDropdownsState, IPagination, ISort, IUsersState, TDisc, TDropdowns, TSearchCriteria } from "../../types"
import { TDiscInEdit } from "../../types"

const mapState = ({ user, discs, dropdowns }: {
  user: IUsersState,
  discs: IDiscsState,
  dropdowns: IDropdownsState
}) => ({
  loggedIn: user.token,
  discs: discs.discs,
  isEditOpen: discs.isEditOpen,
  discInEdit: discs.discInEdit,
  dropdowns: dropdowns.dropdowns,
  imageUploading: discs.imageUploading,
  searchOperations: discs.searchOperations,
  pagination: discs.pagination,
  sort: discs.sort
})

const mapDispatch = {
  getDiscs: getDiscs(defaultSort, defaultPagination),
  getDropdowns: getDropdowns(),
  getDiscSearchOperations: getDiscSearchOperations(),
  getDropdownsByManufacturer: (manufacturerId: number) => getDropdownsByManufacturer(manufacturerId),
  updateDisc: (disc: TDisc) => updateDisc(disc),
  createDisc: () => createDisc(),
  toggleEditModal: (disc: TDisc | null) => toggleEditModal(disc),
  deleteDisc: (uuid: string) => deleteDisc(uuid),
  search: (sort: ISort, pagination: IPagination, criteria: TSearchCriteria[]) => search(sort, pagination, criteria),
  updateImage: (uuid: string, base64: string) => updateImageApi(uuid, base64)
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export interface DiscImage {
  uuid: string | null,
  image?: string
}

const DiscsContainer = (props: PropsFromRedux) => {
  const [newImage, setNewImage] = useState<DiscImage>({ uuid: null })
  const [isImageCropOpen, setImageCropOpen] = useState(false)
  const [filters, setFilters] = useState([])

  const toggleImageCropModal = () => setImageCropOpen(!isImageCropOpen)

  const handleAcceptedFiles = ({ acceptedFiles, uuid }: {
    acceptedFiles: File[],
    uuid: string
  }) => {
    if (acceptedFiles.length == 1) {
      const file = acceptedFiles[0]
      base64Reader(file).then(base64 => {
        if (typeof base64 === "string") {
          setNewImage({ uuid, image: base64 })
          setImageCropOpen(true)
        }
      })
    } else {
      console.log("Zero or more than one file sent")
    }
  }

  const resizeAndUpdateImage = (uuid: string, base64: string) => {
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
}: {
  isOpen: boolean,
  toggleModal: typeof toggleEditModal,
  updateDisc: any,
  discInEdit: TDiscInEdit | null,
  dropdowns: TDropdowns,
  getDropdownsByManufacturer: any
}) => (
  <Modal isOpen={isOpen} onRequestClose={() => toggleModal(null)} contentLabel="Kiekon muokkaus">
    <DiscEditForm
      onSubmit={updateDisc}
      initialValues={discInEdit}
      dropdowns={dropdowns}
      getDropdownsByManufacturer={getDropdownsByManufacturer}
    />
  </Modal>
)

const ImageCropModal = ({ isOpen, toggleModal, newImage, imageUploading, updateImage }: {
  isOpen: boolean,
  toggleModal: any,
  newImage: DiscImage,
  imageUploading: boolean,
  updateImage: any
}) => (
  <Modal isOpen={isOpen} onRequestClose={() => toggleModal()} contentLabel="Kuvan rajaus">
    <ImageCrop image={newImage} imageUploading={imageUploading} updateImage={updateImage} />
  </Modal>
)

export default connector(DiscsContainer)