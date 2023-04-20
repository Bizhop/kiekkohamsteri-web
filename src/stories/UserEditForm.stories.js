import React from "react"

import UserEditForm from "../components/user/UserEditForm"

const onSubmit = data => alert("Submitting... " + JSON.stringify(data))
const initialValues = {
  username: "Test man",
  firstName: "Test",
  lastName: "Man",
  pdgaNumber: 12345
}

export default {
  title: "User Edit Form",
  component: UserEditForm
}

export const defaultForm = () => <UserEditForm onSubmit={onSubmit} initialValues={initialValues} />
