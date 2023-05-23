import React from "react"

import { OneDiscContainer } from "../components/discs/OneDiscContainer"
import { testDisc } from "./data/testData"

const getDisc = () => alert("This should not trigger")

export default {
  title: "Containers/One Disc",
  component: OneDiscContainer
}

export const fetching = () => <OneDiscContainer oneDiscText="Haetaan..." disc={null} loggedIn="xxx" getDisc={getDisc} />
export const example = () => <OneDiscContainer oneDiscText="" disc={testDisc} loggedIn="xxx" getDisc={getDisc} />
export const notAvailable = () => <OneDiscContainer oneDiscText="Ei saatavilla." disc={null} loggedIn="xxx" getDisc={getDisc} />
