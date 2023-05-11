import React from "react"
import Modal from "../shared/Modal"
import UserEditForm from "./UserEditForm"
import { TUser, TUserUpdate } from "../../types"
import { pick } from "ramda"

const UserEditModal = ({ isOpen, toggleModal, label, editUser, user }: {
  isOpen: boolean,
  toggleModal: (user: TUser | null) => any,
  label: string,
  editUser: (id: number, user: TUserUpdate) => any,
  user: TUser | null
}) => user ? (
  <Modal
    isOpen={isOpen}
    onRequestClose={() => toggleModal(null)}
    contentLabel={label}
  >
    <UserEditForm onSubmit={(values: TUser) => editUser(user.id, pick(["username", "firstName", "lastName", "pdgaNumber"], values))} initialValues={user} />
  </Modal>
) : null

export default UserEditModal
