import React from "react"
import { ConnectedProps, connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { Spinner } from "react-activity"
import "react-activity/dist/library.css"
import { Box } from "@mui/material"

import { getLost, found } from "../discs/discsActions"
import DiscsTable from "../discs/DiscsTable"
import { getStats } from "./othersActions"
import StatsTable from "./StatsTable"
import { defaultStatsPagination, defaultStatsSort } from "./othersReducer"
import { IDiscsState, IPagination, ISort, IStatsState, IUsersState } from "../../types"
import { defaultPagination } from "../shared/constants"

const mapState = ({ user, others, discs }: {
  user: IUsersState,
  others: IStatsState,
  discs: IDiscsState
}) => ({
  loggedIn: user.token,
  username: user.user?.username,
  fetchingStats: others.fetching,
  statsSort: others.sort,
  stats: others.stats,
  fetchingLost: discs.fetchingLost,
  lost: discs.lost,
  lostSort: discs.lostSort,
  lostPagination: discs.lostPagination,
})

const mapDispatch = {
  getStats: getStats(defaultStatsSort, defaultStatsPagination),
  getLost: getLost({ sort: "updatedAt,desc", column: "Pvm" }, defaultPagination),
  updateLost: (sort: ISort, pagination: IPagination) => getLost(sort, pagination),
  updateStats: (sort: ISort, pagination: IPagination) => getStats(sort, pagination),
  found: (uuid: string) => found(uuid),
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export const OthersContainer = (props: PropsFromRedux): JSX.Element => {
  const { loggedIn, username, fetchingStats, statsSort, stats, fetchingLost, lost, lostSort, lostPagination, updateLost, updateStats, found } = props

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>Kadonneet</h1>
      {fetchingLost ? (
        <Spinner />
      ) : (
        <DiscsTable
          discs={lost}
          search={updateLost}
          username={username}
          foundFunctions={{discFound: found}}
          sort={lostSort}
          pagination={lostPagination}
          filters={[]}
        />
      )}
      <h1>Statistiikat</h1>
      {fetchingStats ? (
        <Spinner />
      ) : (
        <StatsTable stats={stats} update={updateStats} sort={statsSort} />
      )}
      {!loggedIn && <Navigate to="/" />}
    </Box>
  )
}

export default connector(OthersContainer)
