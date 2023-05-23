import React from "react"

import SelectManufacturerForm from "../components/shared/SelectManufacturerForm"
import { dropdowns } from "./data/testData"

const props = {
  manufacturerId: 0,
  manufacturers: dropdowns.manufacturers,
  getByManufacturer: value => alert("Get by manufacturer, value: " + value)
}

export default {
  title: "Forms/SelectManufacturer",
  component: SelectManufacturerForm
}

export const example = () => <SelectManufacturerForm {...props} />
