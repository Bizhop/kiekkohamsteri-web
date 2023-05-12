import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ConnectedProps, connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Box } from "@mui/material"

import { defaultSort, defaultPagination } from "../shared/constants"
import { getOtherUserDiscs } from "../discs/discsActions"
import DiscsTable from "../discs/DiscsTable"
import { IDiscsState, IPagination, ISort, IUsersState, TSearchCriteria } from "../../types"

const mapState = ({ user, discs }: {
  user: IUsersState,
  discs: IDiscsState
}) => ({
  loggedIn: user.token,
  discs: discs.discs,
  otherUserDiscs: discs.otherUserDiscs,
  otherUserName: discs.otherUserName,
  pagination: discs.pagination,
  sort: discs.sort,
})

const mapDispatch = {
  getDiscs: (userId: number) => getOtherUserDiscs(defaultSort, defaultPagination, userId),
  search: (sort: ISort, pagination: IPagination, userId: number) => getOtherUserDiscs(sort, pagination, userId),
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export const OneUserContainer = (props: PropsFromRedux): JSX.Element => {
  const [userId, setUserId] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const newUserId = location.pathname.split("/").pop()
    if (newUserId) {
      const parsed = parseInt(newUserId)
      if (typeof parsed == 'number') {
        setUserId(parsed)
      }
    }
  })

  useEffect(() => {
    if (userId != 0) {
      props.getDiscs(userId)
    }
  }, [userId])

  const handleSearch = (sort: ISort, pagination: IPagination, _criteria: TSearchCriteria[]) => props.search(sort, pagination, userId)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>{props.otherUserName}</h1>
      <DiscsTable
        discs={props.discs}
        search={handleSearch}
        sort={props.sort}
        pagination={props.pagination}
        filters={[]}
      />
      {!props.loggedIn && <Navigate to="/" />}
    </Box>
  )
}

export default connector(OneUserContainer)
