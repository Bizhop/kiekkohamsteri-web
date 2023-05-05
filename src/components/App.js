import React from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Container, Box, Stack, Paper, Divider } from "@mui/material"

import Header from "./shared/Header"
import DashContainer from "./dash/DashContainer"
import DiscsContainer from "./discs/DiscsContainer"
import OneDiscContainer from "./discs/OneDiscContainer"
import OneUserContainer from "./user/OneUserContainer"
import ShopContainer from "./shop/ShopContainer"
import MuutContainer from "./others/OthersContainer"
import GroupContainer from "./group/GroupContainer"
import AdminContainer from "./admin/AdminContainer"
import Footer from "./shared/Footer"

const NotFound = () => (
  <Box sx={{ flexGrow: 1 }}>
    <h1>Page not Found 404!</h1>
  </Box>
)

const MyRoutes = () => (
  <div>
    <Routes>
      <Route exact path="/" element={<DashContainer />} />
      <Route exact path="/discs" element={<DiscsContainer />} />
      <Route exact path="/discs/:id" element={<OneDiscContainer />} />
      <Route exact path="/users/:id" element={<OneUserContainer />} />
      <Route exact path="/shop" element={<ShopContainer />} />
      <Route exact path="/others" element={<MuutContainer />} />
      <Route exact path="/groups" element={<GroupContainer />} />
      <Route exact path="/admin" element={<AdminContainer />} />
      <Route element={NotFound} />
    </Routes>
  </div>
)

const App = () => (
  <Container component={Paper}>
    <Box sx={{ height: "100vh" }}>
      <Stack direction="column">
        <Header />
        <Divider />
        <MyRoutes />
      </Stack>
      <Footer />
    </Box>
    <ToastContainer autoClose={1500} position="top-center" />
  </Container>
)

export default App
