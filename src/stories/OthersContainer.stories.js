import React from "react"

import { OthersContainer } from "../components/others/OthersContainer"
import { defaultStatsSort } from "../components/others/othersReducer"
import { defaultPagination, defaultSort } from "../components/shared/constants"
import { stats, testDisc } from "./data/testData"

const props = {
  loggedIn: "xxx",
  username: "User",
  statsSort: defaultStatsSort,
  stats,
  lost: [testDisc],
  lostSort: defaultSort,
  lostPagination: defaultPagination,
  updateLost: params => alert("Get lost, params: " + JSON.stringify(params)),
  updateStats: params => alert("Get stats, params: " + JSON.stringify(params)),
  found: id => alert("Mark disc found, id: " + id)
}

export default {
  title: "Containers/Others",
  component: OthersContainer
}

export const fetching = () => <OthersContainer {...props} fetchingStats fetchingLost />
export const emptyTables = () => <OthersContainer {...props} stats={[]} lost={[]} />
export const examples = () => <OthersContainer {...props} />
