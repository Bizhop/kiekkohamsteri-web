import React from "react"

import { Header } from "../components/shared/Header"

const logout = () => alert("Logout")

export default {
  title: "Containers/Header",
  component: Header
}

export const loggedIn = () => <Header loggedIn="xxx" logout={logout} />
