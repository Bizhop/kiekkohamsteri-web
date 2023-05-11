import React from "react"

import MoldsComponent from "../components/mold/MoldsComponent"
import { dropdowns, testMolds } from "./data/testData"
import { defaultMoldSort } from "../components/mold/moldReducer"
import { defaultPagination } from "../components/shared/constants"

const moldProps = {
  loggedIn: "xxx",
  molds: testMolds,
  dropdowns: dropdowns,
  isMoldCreateOpen: false,
  moldSelectedManufacturer: { id: 0, name: "Discmania" },
  moldSort: defaultMoldSort,
  moldPagination: {...defaultPagination, totalElements: 20}
}

const moldDispatch = {
  getMolds: (sort, pagination) => alert("Get molds, sort: " + JSON.stringify(sort) + ", pagination: " + JSON.stringify(pagination)),
  getMoldsByManufacturer: (manufacturerId, sort, pagination) => alert("Get molds by manufacturer, manufacturerId: " + manufacturerId + ", sort: " + JSON.stringify(sort) + ", pagination: " + JSON.stringify(pagination)),
  toggleMoldCreateModal: () => alert("Toggle create modal"),
  createMold: (mold) => alert("Create mold: " + JSON.stringify(mold)),
}

export default {
  title: "Components/Molds",
  component: MoldsComponent
}

export const molds10of20 = () => <MoldsComponent props={moldProps} dispatch={moldDispatch} />
export const createModalOpen = () => <MoldsComponent props={{...moldProps, isMoldCreateOpen: true}} dispatch={moldDispatch} />
