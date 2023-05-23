import React from "react"
import Modal from "../shared/Modal"
import DiscEditForm from "./DiscEditForm"
import { TDisc, TDiscInEdit, TDropdowns } from "../../types"
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
  toggleModal: (disc: TDisc | null) =>any,
  updateDisc: (disc: TDiscInEdit) => any,
  discInEdit: TDiscInEdit | null,
  dropdowns: TDropdowns,
  getDropdownsByManufacturer: (manufacturerId: number) => any
}) => (
  <Modal isOpen={isOpen} onRequestClose={() => toggleModal(null)} contentLabel="Kiekon muokkaus">
    {discInEdit ?
      (
        <DiscEditForm
          onSubmit={updateDisc}
          initialValues={discInEdit}
          dropdowns={dropdowns}
          getDropdownsByManufacturer={getDropdownsByManufacturer}
        />
      ) : (
        <p>Haetaan...</p>
      )
    }
  </Modal>
)

export default DiscEditModal
