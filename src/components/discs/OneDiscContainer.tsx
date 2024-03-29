import React, { useEffect, useState } from "react"
import { ConnectedProps, connect } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { Box, Chip, Paper, Stack, Table, TableBody, TableCell, TableRow } from "@mui/material"

import { getDisc } from "./discsActions"
import { imageUrl } from "../shared/images"
import { markings } from "../shared/constants"
import { IDiscsState, IUsersState } from "../../types"

const mapState = ({ user, discs }: {
  user: IUsersState,
  discs: IDiscsState
}) => ({
  loggedIn: user.token,
  disc: discs.disc,
  oneDiscText: discs.oneDiscText
})

const mapDispatch = {
  getDisc: (uuid: string) => getDisc(uuid)
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

export const OneDiscContainer = (props: PropsFromRedux): JSX.Element => {
  const { loggedIn, disc, oneDiscText, getDisc } = props

  const [uuid, setUuid] = useState("")
  const location = useLocation()

  useEffect(() => {
    const newUuid = location.pathname.split("/").pop()
    if (newUuid) {
      setUuid(newUuid)
    }
  }, [])

  useEffect(() => {
    if(uuid) {
      props.getDisc(uuid)
    }
  }, [uuid])

  return (
    <Box sx={{ flexGrow: 1 }}>
      {oneDiscText && <h1>{oneDiscText}</h1>}
      {disc && (
        <div>
          <h1>
            {disc.mold?.manufacturer.name} {disc.plastic?.name} {disc.mold?.name} ({disc.color.name})
          </h1>
          <Stack direction="row" spacing={5}>
            <img src={`${imageUrl}t_kiekko/${disc.image}`} className="image100" />
            <Box component={Paper} padding={3} elevation={3}>
              <Stack direction="column" spacing={3}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Omistaja</TableCell>
                      <TableCell>{disc.owner.username}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lentoarvot</TableCell>
                      <TableCell>{disc.mold?.speed} / {disc.mold?.glide} / {disc.mold?.stability} / {disc.mold?.fade}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kunto</TableCell>
                      <TableCell>{disc.condition} / 10</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tussit</TableCell>
                      <TableCell>{markings[disc.markings - 1]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Paino</TableCell>
                      <TableCell>{disc.weight} g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Muuta</TableCell>
                      <TableCell>{disc.description}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {disc.dyed && <Chip label="Värjätty" variant="outlined" />}
                {disc.glow && <Chip label="Hohtava" variant="outlined" />}
                {disc.swirly && <Chip label="Swirly" variant="outlined" />}
                {disc.special && <Chip label="Erikoisuus" variant="outlined" />}
              </Stack>
            </Box>
          </Stack>
        </div>
      )}
      {!loggedIn && <Navigate to="/" />}
    </Box>
  )
}

export default connector(OneDiscContainer)
