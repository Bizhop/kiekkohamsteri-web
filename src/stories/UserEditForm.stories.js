import React from "react"

import UserEditForm from "../components/user/UserEditForm"
import { testUser } from "./data/testData"

const onSubmit = data => alert("Submitting... " + JSON.stringify(data))

export default {
  title: "Forms/User Edit Form",
  component: UserEditForm
}

export const defaultForm = () => <UserEditForm onSubmit={onSubmit} initialValues={testUser} />
