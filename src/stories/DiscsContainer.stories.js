import React from "react"

import { DiscsContainer } from "../components/discs/DiscsContainer"
import { dropdowns, testDisc } from "./data/testData"
import { defaultPagination, defaultSort } from "../components/shared/constants"

// 10 discs
const discs = []
for (var i = 0; i < 10; i++) {
  discs.push({...testDisc, uuid: testDisc.uuid + "-" + i})
}

const props = {
  loggedIn: "xxx",
  discs: discs,
  isEditOpen: false,
  discInEdit: null,
  dropdowns,
  imageUploading: false,
  searchOperations: [],
  pagination: {...defaultPagination, totalElements: 20},
  sort: defaultSort,
  getDropdownsByManufacturer: id => alert("Get dropdowns by manufacturer, id: " + id),
  updateDisc: disc => alert("Update disc: " + JSON.stringify(disc)),
  createDisc: () => alert("Create disc"),
  toggleEditModal: disc => alert("Toggle edit modal, disc: " + JSON.stringify(disc)),
  deleteDisc: id => alert("Deleting disc: " + id),
  search: (sort, pagination, _criteria) => alert("Searching, sort = " + JSON.stringify(sort) + ", pagination = " + JSON.stringify(pagination)),
  updateImage: (uuid, _base64) => alert("Updating image for: " + uuid)
}

export default {
  title: "Containers/Discs",
  component: DiscsContainer
}

export const example = () => <DiscsContainer {...props} />
