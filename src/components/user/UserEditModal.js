import React from "react"
import Modal from "../shared/Modal"
import UserEditForm from "./UserEditForm"

const UserEditModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={() => props.toggleModal(null)}
    contentLabel={props.label}
  >
    <UserEditForm onSubmit={props.editUser} initialValues={props.user} user={props.user} />
  </Modal>
)

export default UserEditModal
