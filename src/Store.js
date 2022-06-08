import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { path } from "ramda"

import rootSaga from './rootSaga'
import rootReducer from './rootReducer'
import { GET_MY_DETAILS, USERS_REQUEST, logout, LEADERS_REQUEST } from './components/user/userActions'
import { KIEKOT_REQUEST, LOST_REQUEST, UPDATE_KIEKKO_REQUEST, JULKISET_REQUEST } from './components/kiekko/kiekkoActions'
import { MOLDS_REQUEST } from './components/mold/moldActions'
import { MUOVIT_REQUEST } from './components/muovi/muoviActions'

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
      success: function (_, res) {
        return Promise.resolve(res);
      },
      error: function ({_getState, dispatch, _getSourceAction}, error) {
        const sourceActionType = path(["config", "reduxSourceAction", "type"], error)
        const status = path(["response", "status"], error)
        switch(sourceActionType) {
          case GET_MY_DETAILS:
          case KIEKOT_REQUEST:
          case USERS_REQUEST:
          case LEADERS_REQUEST:
          case UPDATE_KIEKKO_REQUEST:
          case JULKISET_REQUEST:
          case LOST_REQUEST:
          case MOLDS_REQUEST:
          case MUOVIT_REQUEST:
            if(status === 403) {
              dispatch(logout())
            }
          default:
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
