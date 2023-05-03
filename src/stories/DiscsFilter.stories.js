import React, { useState } from "react"

import DiscsFilter from "../components/discs/DiscsFilter"
import { defaultPagination, defaultSort, supportedOperations } from "./data/testData"

const search = (_sort, _pagination, criteria) => alert("Searching, criteria = " + JSON.stringify(criteria))

export default {
  title: "Discs Filter",
  component: DiscsFilter
}

export const exampleFilters = () => {
  const [filters, setFilters] = useState([])

  return (
    <DiscsFilter searchOperations={supportedOperations} search={search} sort={defaultSort} pagination={defaultPagination} filters={filters} setFilters={setFilters} />
  )
}
