import React from "react"

import Modal from "../components/shared/Modal"

const closeModal = () => alert("Pls close modal")

export default {
  title: "Components/Modal",
  component: Modal
}

export const empty = () => <Modal isOpen onRequestClose={closeModal} contentLabel="Example label"><p>Just some text in modal</p></Modal>
