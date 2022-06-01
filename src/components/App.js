import React from "react"
import { Route, Routes } from "react-router-dom"

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
      <Route exact path="/kiekot" element={<KiekkoContainer />} />
      <Route exact path="/kiekot/:id" element={<YksiKiekkoContainer />} />
      <Route exact path="/molds" element={<MoldContainer />} />
      <Route exact path="/muovit" element={<MuoviContainer />} />
      <Route exact path="/kaupat" element={<MyytavatContainer />} />
      <Route exact path="/rating" element={<RatingContainer />} />
      <Route exact path="/muut" element={<MuutContainer />} />
      <Route element={NotFound} />
    </Routes>
  </div>
)

const App = () => (
  <div className="app">
    <Header />
    <MyRoutes />
  </div>
)

export default App
