import React from "react"

import CreateMoldForm from "../components/mold/CreateMoldForm"

const onSubmit = data => alert("Submitting... " + JSON.stringify(data))
const selectedManufacturer = {
  id: 0,
  name: "Discmania"
}

export default {
  title: "Forms/Create Mold",
  component: CreateMoldForm
}

export const defaultForm = () => <CreateMoldForm onSubmit={onSubmit} selectedManufacturer={selectedManufacturer} />
