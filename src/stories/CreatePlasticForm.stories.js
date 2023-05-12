import React from "react"

import CreatePlasticForm from "../components/plastics/CreatePlasticForm"

const onSubmit = data => alert("Submitting... " + JSON.stringify(data))
const selectedManufacturer = {
  id: 0,
  name: "Discmania"
}

export default {
  title: "Forms/Create Plastic",
  component: CreatePlasticForm
}

export const defaultForm = () => <CreatePlasticForm onSubmit={onSubmit} selectedManufacturer={selectedManufacturer} />
