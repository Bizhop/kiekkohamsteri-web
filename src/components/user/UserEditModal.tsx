import React from "react"
import Modal from "../shared/Modal"
import UserEditForm from "./UserEditForm"
import { TUser } from "../../types"
import { toggleEditModal } from "./userActions"

const UserEditModal = ({isOpen, toggleModal, label, editUser, user}: {
  isOpen: boolean,
  toggleModal: typeof toggleEditModal,
  label: string,
  editUser: any,
  user: TUser | null
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={() => toggleModal(null)}
    contentLabel={label}
  >
    <UserEditForm onSubmit={editUser} initialValues={user} />
  </Modal>
)

export default UserEditModal
