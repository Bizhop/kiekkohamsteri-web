import React from "react"

import { OneUserContainer } from "../components/user/OneUserContainer"
import { defaultPagination, defaultSort } from "../components/shared/constants"
import { testDisc } from "./data/testData"

const props = {
  loggedIn: "xxx",
  discs: [testDisc],
  otherUserDiscs: true,
  otherUserName: "Other user",
  pagination: defaultPagination,
  sort: defaultSort,
  getDiscs: userId => alert("Getting discs for user, id: " + userId),
  search: params => alert("Searching, params: " + JSON.stringify(params))
}

export default {
  title: "Containers/One User",
  component: OneUserContainer
}

export const example = () => <OneUserContainer {...props} />
