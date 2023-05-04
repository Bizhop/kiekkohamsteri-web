import React from "react"

import DiscsTable from "../components/discs/DiscsTable"
import { defaultSort, defaultPagination, testDisc } from "./data/testData"

const search = (sort, pagination, _criteria) => alert("Searching, sort = " + JSON.stringify(sort) + ", pagination = " + JSON.stringify(pagination))
const sortOptions = [
  defaultSort,
  {
    column: "Paino",
    sort: "weight,desc"
  }
]
const handleAcceptedFiles = (files, uuid) => alert("Files: " + JSON.stringify(files) + ", uuid: " + uuid)
const toggleEditModal = (disc) => alert("Toggling edit modal for uuid: " + disc.uuid)
const deleteDisc = (uuid) => alert("Deleting uuid: " + uuid)

export default {
  title: "Discs Table",
  component: DiscsTable
}

// 10 discs
const discs = []
for (var i = 0; i < 10; i++) {
  discs.push({...testDisc, uuid: testDisc.uuid + "-" + i})
}


const paginationFirst10of27 = {
  ...defaultPagination,
  totalElements: 27
}

export const discs10of27 = () => <DiscsTable discs={discs} filters={[]} sort={defaultSort} pagination={paginationFirst10of27} search={search} sortOptions={sortOptions} />


const paginationMiddle10of27 = {
  ...defaultPagination,
  number: 1,
  totalElements: 27
}

export const discsMiddle10of27 = () => <DiscsTable discs={discs} filters={[]} sort={defaultSort} pagination={paginationMiddle10of27} search={search} sortOptions={sortOptions} />


const paginationLast7of27 = {
  ...defaultPagination,
  number: 2,
  totalElements: 27
}

export const discsLast7of27 = () => <DiscsTable discs={discs.slice(0, 7)} filters={[]} sort={defaultSort} pagination={paginationLast7of27} search={search} sortOptions={sortOptions} />

export const editable = () =>
  <DiscsTable
    discs={discs}
    filters={[]}
    sort={defaultSort}
    pagination={paginationFirst10of27}
    search={search}
    sortOptions={sortOptions}
    editable
    handleAcceptedFiles={handleAcceptedFiles}
    toggleEditModal={toggleEditModal}
    deleteDisc={deleteDisc}
  />
