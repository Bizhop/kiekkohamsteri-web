import React from "react"

import DiscEditForm from "../components/discs/DiscEditForm"
import { testDisc, dropdowns } from "./data/testData"

const onSubmit = data => alert("Submitting... " + JSON.stringify(data))
const getDropdownsByManufacturer = value => console.log("Get dropdowns by value: " + value)
const discInEdit = {
  ...testDisc,
  manufacturerId: testDisc.mold?.manufacturer.id,
  moldId: testDisc.mold?.id,
  plasticId: testDisc.plastic?.id,
  colorId: testDisc.color.id,
}

export default {
  title: "Forms/Disc Edit",
  component: DiscEditForm
}

export const defaultForm = () => <DiscEditForm onSubmit={onSubmit} initialValues={discInEdit} dropdowns={dropdowns} getDropdownsByManufacturer={getDropdownsByManufacturer} />
