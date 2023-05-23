import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { ConnectedProps, connect, useDispatch } from "react-redux"
import { Box, Grid, IconButton, Tooltip } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import LogoutIcon from "@mui/icons-material/Logout"
import AnimationIcon from "@mui/icons-material/Animation"
import HandshakeIcon from "@mui/icons-material/Handshake"
import GroupsIcon from "@mui/icons-material/Groups"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"

import { logout, getMyDetails } from "../user/userActions"
import { isAdmin } from "./utils"
import { IUsersState } from "../../types"

const mapState = ({ user }: { user: IUsersState }) => ({
  loggedIn: user.token,
  user: user.user,
})

const mapDispatch = {
  logout: () => logout(),
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

const MyNavLink = ({ to, label, icon }: {
  to: string,
  label: string,
  icon: JSX.Element
}) => (
  <Grid item md={1} textAlign="center">
    <NavLink to={to}>
      <Tooltip title={label}>
        <IconButton size="small">
          {icon}
        </IconButton>
      </Tooltip>
    </NavLink>
  </Grid>
)

export const Header = (props: PropsFromRedux): JSX.Element => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyDetails())
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <MyNavLink to="/" label="Etusivu" icon={<HomeIcon />} />
        {props.loggedIn && <MyNavLink to="/discs" label="Kiekot" icon={<AnimationIcon />} />}
        {props.loggedIn && <MyNavLink to="/shop" label="Kaupat" icon={<HandshakeIcon />} />}
        {props.loggedIn && <MyNavLink to="/groups" label="Ryhmät" icon={<GroupsIcon />} />}
        {props.loggedIn && <MyNavLink to="/others" label="Muut" icon={<MoreHorizIcon />} />}
        {props.loggedIn && isAdmin(props.user) && (
          <MyNavLink to="/admin" label="Ylläpito" icon={<AdminPanelSettingsIcon />} />
        )}
        {props.loggedIn && (
          <Grid item md>
            <Box display="flex" justifyContent="flex-end">
              <Tooltip title="Kirjaudu ulos">
                <IconButton onClick={() => props.logout()} color="error">
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default connector(Header)
