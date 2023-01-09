import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import axios from "axios"
import axiosMiddleware from "redux-axios-middleware"
import { path } from "ramda"

import rootSaga from "./rootSaga"
import rootReducer from "./rootReducer"
import { GET_MY_DETAILS, USERS_REQUEST, logout, getMyDetails } from "./components/user/userActions"
import { DISCS_REQUEST, LOST_REQUEST, UPDATE_DISC_REQUEST } from "./components/discs/discsActions"
import { MOLDS_REQUEST } from "./components/mold/moldActions"
import { MUOVIT_REQUEST } from "./components/plastics/plasticsActions"
import {
  FOR_SALE_REQUEST,
  OWN_BUYS_REQUEST,
  BUY_REQUEST,
  REJECT_BUY_REQUEST,
  CONFIRM_BUY_REQUEST,
} from "./components/shop/shopActions"
import {
  COMPLETE_REQUEST,
  CREATE_GROUP,
  DEMOTE,
  getGroups,
  JOIN_GROUP,
  PROMOTE,
  KICK,
} from "./components/group/groupActions"

const env = process.env.NODE_ENV
const baseURL = process.env.API_URL

const client = axios.create({
  baseURL: baseURL,
  responseType: "json",
})

const axiosMWConfig = {
  interceptors: {
    request: [
      {
        success: function (_, req) {
          return req
        },
        error: function (_, error) {
          console.log(error)
          return error
        },
      },
    ],
    response: [
      {
        success: function ({ dispatch }, res) {
          const sourceActionType = path(["config", "reduxSourceAction", "type"], res)
          const status = path(["status"], res)
          switch (sourceActionType) {
            case CREATE_GROUP:
            case JOIN_GROUP:
            case PROMOTE:
            case DEMOTE:
            case KICK:
              if (status === 200) {
                dispatch(getMyDetails())
              }
              break
            case COMPLETE_REQUEST:
              if (status === 200) {
                dispatch(getGroups())
                dispatch(getMyDetails())
              }
              break
            default:
              break
          }
          return Promise.resolve(res)
        },
        error: function ({ dispatch }, error) {
          const sourceActionType = path(["config", "reduxSourceAction", "type"], error)
          const status = path(["response", "status"], error)
          switch (sourceActionType) {
            case GET_MY_DETAILS:
            case DISCS_REQUEST:
            case USERS_REQUEST:
            case UPDATE_DISC_REQUEST:
            case LOST_REQUEST:
            case MOLDS_REQUEST:
            case MUOVIT_REQUEST:
            case FOR_SALE_REQUEST:
            case OWN_BUYS_REQUEST:
            case BUY_REQUEST:
            case REJECT_BUY_REQUEST:
            case CONFIRM_BUY_REQUEST:
              if (status === 403) {
                dispatch(logout())
              }
              break
            default:
              break
          }
          return Promise.reject(error)
        },
      },
    ],
  },
}

const sagaMW = createSagaMiddleware()
const axiosMW = axiosMiddleware(client, axiosMWConfig)

const Store = () => {
  const middlewares = [sagaMW, axiosMW]

  const enhancer =
    env === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares))

  const store = createStore(rootReducer, enhancer)

  store.sagaTask = sagaMW.run(rootSaga)

  return store
}

export default Store
