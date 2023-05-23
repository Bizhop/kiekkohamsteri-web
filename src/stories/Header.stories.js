import React from "react"

import { Header } from "../components/shared/Header"
import { adminUser } from "./data/testData"

const logout = () => alert("Logout")

export default {
  title: "Containers/Header",
  component: Header
}

export const loggedIn = () => <Header loggedIn="xxx" logout={logout} />
export const loggedInAsAdmin = () => <Header loggedIn="xxx" user={adminUser} logout={logout} />
export const loggedOut = () => <Header />
