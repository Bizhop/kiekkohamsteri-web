import React from "react"
import { path, any, propEq } from "ramda"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { Box, Grid, IconButton, Tooltip } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import LogoutIcon from "@mui/icons-material/Logout"
import AnimationIcon from "@mui/icons-material/Animation"
import ShopIcon from "@mui/icons-material/Shop"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import GroupsIcon from "@mui/icons-material/Groups"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import GroupIcon from "@mui/icons-material/Group"
import BubbleChartIcon from "@mui/icons-material/BubbleChart"
import SupportIcon from "@mui/icons-material/Support"

import { logout, getMyDetails } from "../user/userActions"

const isAdmin = user => {
  if (!user || !user.roles) return false
  return any(propEq("name", "ADMIN"))(user.roles)
}

const MyNavLink = ({ to, label, icon }) => (
  <Grid item md={1} textAlign="center">
    <NavLink to={to}>
      <Tooltip title={label}>
        <IconButton variant="outlined" size="small">
          {icon}
        </IconButton>
      </Tooltip>
    </NavLink>
  </Grid>
)

const Header = props => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={1}>
      <MyNavLink to="/" label="Etusivu" icon={<HomeIcon />} />
      {props.loggedIn && <MyNavLink to="/discs" label="Kiekot" icon={<AnimationIcon />} />}
      {props.loggedIn && <MyNavLink to="/shop" label="Kaupat" icon={<ShopIcon />} />}
      {/* {props.loggedIn && <MyNavLink to="/rating" label="Rating" icon={<TrendingUpIcon />} />} */}
      {props.loggedIn && <MyNavLink to="/groups" label="Ryhmät" icon={<GroupsIcon />} />}
      {props.loggedIn && <MyNavLink to="/others" label="Muut" icon={<MoreHorizIcon />} />}
      {props.loggedIn && isAdmin(props.user) && <MyNavLink to="/users" label="Käyttäjät" icon={<GroupIcon />} />}
      {props.loggedIn && isAdmin(props.user) && <MyNavLink to="/molds" label="Moldit" icon={<BubbleChartIcon />} />}
      {props.loggedIn && isAdmin(props.user) && <MyNavLink to="/plastics" label="Muovit" icon={<SupportIcon />} />}
      {props.loggedIn && (
        <Grid item md>
          <Box display="flex" justifyContent="flex-end">
            <Tooltip title="Kirjaudu ulos">
              <IconButton onClick={() => props.logout()} variant="contained" color="error">
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      )}
    </Grid>
  </Box>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  user: path(["user", "user"], state),
})

const mapDispatchToProps = dispatch => ({
  getMyDetails: dispatch(getMyDetails()),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
