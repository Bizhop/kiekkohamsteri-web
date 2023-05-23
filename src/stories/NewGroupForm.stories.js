import React from "react"

import NewGroupForm from "../components/group/NewGroupForm"

const onSubmit = data => alert("Submitting... " + JSON.stringify(data))

export default {
  title: "Forms/New Group",
  component: NewGroupForm
}

export const defaultForm = () => <NewGroupForm onSubmit={onSubmit} />
