import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { path } from "ramda"

import rootSaga from './rootSaga'
import rootReducer from './rootReducer'
import { GET_MY_DETAILS, USERS_REQUEST, logout, LEADERS_REQUEST, getMyDetails } from './components/user/userActions'
import { KIEKOT_REQUEST, LOST_REQUEST, UPDATE_KIEKKO_REQUEST, JULKISET_REQUEST } from './components/kiekko/kiekkoActions'
import { MOLDS_REQUEST } from './components/mold/moldActions'
import { MUOVIT_REQUEST } from './components/muovi/muoviActions'
import { MYYTAVAT_REQUEST } from './components/myytavat/myytavatActions'
import { HYVAKSY_OSTO_REQUEST, OMAT_OSTOT_REQUEST, OSTA_REQUEST, PERUUTA_OSTO_REQUEST } from './components/osto/ostoActions'
import { COMPLETE_REQUEST, CREATE_GROUP, DEMOTE, getGroups, JOIN_GROUP, PROMOTE, KICK } from './components/group/groupActions'

const env = process.env.NODE_ENV
const baseURL = process.env.API_URL

const client = axios.create({
  baseURL: baseURL,
  responseType: 'json',
})

const axiosMWConfig = {
  interceptors: {
    request: [{
      success: function (_, req) {
        return req;
      },
      error: function (_, error) {
        console.log(error)
        return error
      }
    }
    ],
    response: [{
      success: function ({ _getState, dispatch, _getSourceAction }, res) {
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
        return Promise.resolve(res);
      },
      error: function ({ _getState, dispatch, _getSourceAction }, error) {
        const sourceActionType = path(["config", "reduxSourceAction", "type"], error)
        const status = path(["response", "status"], error)
        switch (sourceActionType) {
          case GET_MY_DETAILS:
          case KIEKOT_REQUEST:
          case USERS_REQUEST:
          case LEADERS_REQUEST:
          case UPDATE_KIEKKO_REQUEST:
          case JULKISET_REQUEST:
          case LOST_REQUEST:
          case MOLDS_REQUEST:
          case MUOVIT_REQUEST:
          case MYYTAVAT_REQUEST:
          case OMAT_OSTOT_REQUEST:
          case OSTA_REQUEST:
          case PERUUTA_OSTO_REQUEST:
          case HYVAKSY_OSTO_REQUEST:
            if (status === 403) {
              dispatch(logout())
            }
            break
          default:
            break
        }
        return Promise.reject(error);
      }
    }
    ]
  }
};

const sagaMW = createSagaMiddleware()
const axiosMW = axiosMiddleware(client, axiosMWConfig)

const Store = () => {
  const middlewares = [sagaMW, axiosMW]

  const enhancer = env === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares),
    )

  const store = createStore(rootReducer, enhancer)

  store.sagaTask = sagaMW.run(rootSaga)

  return store
}

export default Store
