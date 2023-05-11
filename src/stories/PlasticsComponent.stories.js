import React from "react"

import PlasticsComponent from "../components/plastics/PlasticsComponent"
import { testPlastics, dropdowns } from "./data/testData"
import { defaultPlasticSort } from "../components/plastics/plasticsReducer"
import { defaultPagination } from "../components/shared/constants"

const plasticProps = {
  loggedIn: "xxx",
  plastics: testPlastics,
  dropdowns: dropdowns,
  isPlasticCreateOpen: false,
  plasticSelectedManufacturer: { id: 0, name: "Discmania" },
  plasticSort: defaultPlasticSort,
  plasticPagination: {...defaultPagination, totalElements: 20}
}

const plasticDispatch = {
  getPlastics: (sort, pagination) => alert("Get plastics, sort: " + JSON.stringify(sort) + ", pagination: " + JSON.stringify(pagination)),
  getPlasticsByManufacturer: (manufacturerId, sort, pagination) => alert("Get plastics by manufacturer, manufacturerId: " + manufacturerId + ", sort: " + JSON.stringify(sort) + ", pagination: " + JSON.stringify(pagination)),
  togglePlasticCreateModal: () => alert("Toggle create modal"),
  createPlastic: (plastic) => alert("Create plastic: " + JSON.stringify(plastic)),
}

export default {
  title: "Components/Plastics",
  component: PlasticsComponent
}

export const plastics10of20 = () => <PlasticsComponent props={plasticProps} dispatch={plasticDispatch} />
export const createModalOpen = () => <PlasticsComponent props={{...plasticProps, isPlasticCreateOpen: true}} dispatch={plasticDispatch} />
