import React, { useEffect } from "react"
import { ConnectedProps, connect, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { Box, Stack } from "@mui/material"
import WestIcon from "@mui/icons-material/West"
import EastIcon from "@mui/icons-material/East"
import HandshakeIcon from "@mui/icons-material/Handshake"

import { getForSale, buyDisc, getOwnBuys, rejectBuy, confirmBuy } from "./shopActions"
import ForSaleTable from "./ForSaleTable"
import MyBuysTable from "./MyBuysTable"
import MySalesTable from "./MySalesTable"
import { defaultPagination, defaultSort } from "../shared/constants"
import { IPagination, IShopState, ISort, IUsersState } from "../../types"

interface IAction {
  label: string
}

export interface INumberAction extends IAction {
  action: (id: number) => any,
}

export interface IStringAction extends IAction {
  action: (id: string) => any,
}

const mapState = ({ user, shop }: { user: IUsersState, shop: IShopState }) => ({
  loggedIn: user.token,
  username: user.user?.username,
  forSale: shop.forSale,
  asBuyer: shop.summary.asBuyer,
  asSeller: shop.summary.asSeller,
  pagination: shop.pagination,
  sort: shop.sort,
})

const mapDispatch = {
  getForSale: getForSale(defaultSort, defaultPagination),
  getOwnBuys: getOwnBuys(),
  updateForSale: (sort: ISort, pagination: IPagination) => getForSale(sort, pagination),
  buyDisc: (uuid: string) => buyDisc(uuid),
  confirm: (id: number) => confirmBuy(id),
  reject: (id: number) => rejectBuy(id),
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export const ShopContainer = (props: PropsFromRedux): JSX.Element => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getForSale(defaultSort, defaultPagination))
    dispatch(getOwnBuys())
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" alignItems="center">
        <h1>Omat ostot</h1><WestIcon sx={{ marginLeft: 2 }} color="primary" />
      </Stack>
      <MyBuysTable
        asBuyer={props.asBuyer}
        reject={{ action: props.reject, label: "Peruuta" }}
      />
      <Stack direction="row" alignItems="center">
        <h1>Omat myynnit</h1><EastIcon sx={{ marginLeft: 2 }} color="primary" />
      </Stack>
      <MySalesTable
        asSeller={props.asSeller}
        confirm={{ action: props.confirm, label: "Hyväksy" }}
        reject={{ action: props.reject, label: "Peruuta" }}
      />
      <Stack direction="row" alignItems="center">
        <h1>Myytävät</h1><HandshakeIcon sx={{ marginLeft: 2 }} color="primary" />
      </Stack>
      {!props.loggedIn && <Navigate to="/" />}
      <ForSaleTable
        discs={props.forSale}
        buy={{
          action: props.buyDisc,
          label: "Osta",
        }}
        username={props.username}
      />
    </Box>
  )
}

export default connector(ShopContainer)
