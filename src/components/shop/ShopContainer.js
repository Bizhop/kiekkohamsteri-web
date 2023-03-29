import React from "react"
import { path, pathOr } from "ramda"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Box } from "@mui/material"

import { getForSale, buyDisc, getOwnBuys, rejectBuy, confirmBuy } from "./shopActions"
import ForSaleTable from "./ForSaleTable"
import MyBuysTable from "./MyBuysTable"
import MySalesTable from "./MySalesTable"
import { defaultPagination } from "../shared/constants"

const ShopContainer = props => (
  <Box sx={{ flexGrow: 1 }}>
    <h1>Omat ostot</h1>
    {props.asBuyer && (
      <MyBuysTable asBuyer={props.asBuyer} action={{ action: props.reject, label: "Peruuta" }} />
    )}
    <h1>Omat myynnit</h1>
    {props.asSeller && (
      <MySalesTable
        asSeller={props.asSeller}
        accept={{ action: props.confirm, label: "Hyväksy" }}
        cancel={{ action: props.reject, label: "Peruuta" }}
      />
    )}
    <h1>Myytävät</h1>
    {!props.loggedIn && <Navigate to="/" />}
    <ForSaleTable
      update={props.updateForSale}
      sort={props.sort}
      discs={props.forSale}
      action={{
        action: props.buyDisc,
        label: "Osta",
      }}
      username={props.username}
    />
  </Box>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  username: path(["user", "user", "username"], state),
  forSale: path(["shop", "forSale"], state),
  asBuyer: path(["shop", "asBuyer"], state),
  asSeller: path(["shop", "asSeller"], state),
  pagination: path(["shop", "pagination"], state),
  sort: path(["shop", "sort"], state),
})

const mapDispatchToProps = dispatch => ({
  getForSale: dispatch(
    getForSale({
      sort: {
        sort: "id,asc",
        column: "Id",
      },
      pagination: defaultPagination,
    })
  ),
  getOwnBuys: dispatch(getOwnBuys()),
  updateForSale: params => dispatch(getForSale(params)),
  buyDisc: uuid => dispatch(buyDisc(uuid)),
  confirm: id => dispatch(confirmBuy(id)),
  reject: id => dispatch(rejectBuy(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer)
