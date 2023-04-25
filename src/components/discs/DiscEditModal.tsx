import React from "react"
import Modal from "../shared/Modal"
import DiscEditForm from "./DiscEditForm"
import { TDiscInEdit, TDropdowns } from "../../types"
import { toggleEditModal } from "./discsActions"

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

export default DiscEditModal
