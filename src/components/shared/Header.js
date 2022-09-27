import React from "react"
import { path, pathOr, any, propEq } from "ramda"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"

import { logout, getMyDetails } from "../user/userActions"

const Header = props => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="row">
          <div className="col-md-1 col-xs-12">
            <NavLink to="/" className="nav-link nav-item">
              Etusivu
            </NavLink>
          </div>
          {props.loggedIn && (
            <div>
              <div className="col-md-1 col-xs-12">
                <NavLink to="/discs" className="nav-link nav-item">
                  Kiekot
                </NavLink>
              </div>
              <div className="col-md-1 col-xs-12">
                <NavLink to="/shop" className="nav-link nav-item">
                  Kaupat
                </NavLink>
              </div>
              <div className="col-md-1 col-xs-12">
                <NavLink to="/rating" className="nav-link nav-item">
                  Rating
                </NavLink>
              </div>
              <div className="col-md-1 col-xs-12">
                <NavLink to="/groups" className="nav-link nav-item">
                  Ryhmät
                </NavLink>
              </div>
              <div className="col-md-1 col-xs-12">
                <NavLink to="/others" className="nav-link nav-item">
                  Muut
                </NavLink>
              </div>
            </div>
          )}
          {props.loggedIn && props.roles &&
            any(propEq('name', 'ADMIN'))(props.roles) && (
              <div>
                <div className="col-md-1 col-xs-12">
                  <NavLink to="/users" className="nav-link nav-item">
                    Käyttäjät
                  </NavLink>
                </div>
                <div className="col-md-1 col-xs-12">
                  <NavLink to="/molds" className="nav-link nav-item">
                    Moldit
                  </NavLink>
                </div>
                <div className="col-md-1 col-xs-12">
                  <NavLink to="/plastics" className="nav-link nav-item">
                    Muovit
                  </NavLink>
                </div>
              </div>
            )}
          {props.loggedIn && (
            <div className="col-md-2 col-xs-12 pull-right">
              <div className="row">
                <div className="col-md-6 col-xs-6">
                  <button onClick={() => props.logout()} className="btn btn-danger">
                    Kirjaudu ulos
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  </div>
)

const mapStateToProps = state => ({
  loggedIn: path(["user", "token"], state),
  user: path(["user", "user"], state),
  roles: pathOr([], ["user", "user", "roles"], state)
})

const mapDispatchToProps = dispatch => ({
  getMyDetails: dispatch(getMyDetails()),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
