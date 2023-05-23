import React from "react"

import { ShopContainer } from "../components/shop/ShopContainer"
import { defaultPagination, defaultSort } from "../components/shared/constants"
import { groupAdmin, testDisc, testUser } from "./data/testData"

const props = {
  loggedIn: "xxx",
  username: "TestMan",
  forSale: [testDisc, {
    ...testDisc,
    owner: testUser
  }],
  asBuyer: [{
    id: 1,
    disc: {...testDisc, price: 20},
    seller: groupAdmin,
    buyer: testUser,
    status: "REQUESTED"
  }],
  asSeller: [{
    id: 2,
    disc: {...testDisc, price: 10},
    seller: testUser,
    buyer: groupAdmin,
    status: "REQUESTED"
  }],
  pagination: defaultPagination,
  sort: defaultSort,
  buyDisc: uuid => alert("Buy disc, uuid: " + uuid),
  confirm: id => alert("Confirm, id: " + id),
  reject: id => alert("Reject, id: " + id)
}

export default {
  title: "Containers/Shop",
  component: ShopContainer
}

export const example = () => <ShopContainer {...props} />
export const empty = () => <ShopContainer {...props} forSale={[]} asBuyer={[]} asSeller={[]} />
