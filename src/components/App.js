import React from "react"
import { Route, Routes } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"

import Header from "./shared/Header"
import DashContainer from "./dash/DashContainer"
import UserContainer from "./user/UserContainer"
import MoldContainer from "./mold/MoldContainer"
import MuoviContainer from "./muovi/MuoviContainer"
import KiekkoContainer from "./kiekko/KiekkoContainer"
import YksiKiekkoContainer from "./kiekko/YksiKiekkoContainer"
import MyytavatContainer from "./myytavat/MyytavatContainer"
import RatingContainer from "./rating/RatingContainer"
import MuutContainer from "./muut/MuutContainer"
import GroupContainer from "./group/GroupContainer"

const NotFound = () => (
  <div className="container">
    <div className="jumbotron">
      <h1>Page not Found 404!</h1>
    </div>
  </div>
)

const MyRoutes = () => (
  <div>
    <Routes>
      <Route exact path="/" element={<DashContainer />} />
      <Route exact path="/users" element={<UserContainer />} />
      <Route exact path="/discs" element={<KiekkoContainer />} />
      <Route exact path="/discs/:id" element={<YksiKiekkoContainer />} />
      <Route exact path="/molds" element={<MoldContainer />} />
      <Route exact path="/plastics" element={<MuoviContainer />} />
      <Route exact path="/shop" element={<MyytavatContainer />} />
      <Route exact path="/rating" element={<RatingContainer />} />
      <Route exact path="/others" element={<MuutContainer />} />
      <Route exact path="/groups" element={<GroupContainer />} />
      <Route element={NotFound} />
    </Routes>
  </div>
)

const App = () => (
  <GoogleOAuthProvider
    clientId="107543052765-lfgp4lke6h51a0l4kp258anilpeegf8v.apps.googleusercontent.com"
  >
    <div className="app">
      <Header />
      <MyRoutes />
    </div>
  </GoogleOAuthProvider>
)

export default App
