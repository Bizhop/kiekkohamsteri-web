import React from "react"
import { Route, Routes } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Container, Box } from "@mui/material"

import Header from "./shared/Header"
import DashContainer from "./dash/DashContainer"
import KiekkoContainer from "./kiekko/KiekkoContainer"
import YksiKiekkoContainer from "./kiekko/YksiKiekkoContainer"
import OneUserContainer from "./user/OneUserContainer"
import MyytavatContainer from "./myytavat/MyytavatContainer"
// import RatingContainer from "./rating/RatingContainer"
import MuutContainer from "./muut/MuutContainer"
import GroupContainer from "./group/GroupContainer"
import AdminContainer from "./admin/AdminContainer"

const NotFound = () => (
  <Box sx={{ flexGrow: 1 }}>
    <h1>Page not Found 404!</h1>
  </Box>
)

const MyRoutes = () => (
  <div>
    <Routes>
      <Route exact path="/" element={<DashContainer />} />
      <Route exact path="/discs" element={<KiekkoContainer />} />
      <Route exact path="/discs/:id" element={<YksiKiekkoContainer />} />
      <Route exact path="/users/:id" element={<OneUserContainer />} />
      <Route exact path="/shop" element={<MyytavatContainer />} />
      {/* <Route exact path="/rating" element={<RatingContainer />} /> */}
      <Route exact path="/others" element={<MuutContainer />} />
      <Route exact path="/groups" element={<GroupContainer />} />
      <Route exact path="/admin" element={<AdminContainer />} />
      <Route element={NotFound} />
    </Routes>
  </div>
)

const App = () => (
  <GoogleOAuthProvider clientId="107543052765-lfgp4lke6h51a0l4kp258anilpeegf8v.apps.googleusercontent.com">
    <Container>
      <Header />
      <MyRoutes />
      <ToastContainer autoClose={2000} position="top-center" />
    </Container>
  </GoogleOAuthProvider>
)

export default App
