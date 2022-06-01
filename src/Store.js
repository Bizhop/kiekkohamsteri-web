import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './rootSaga'
import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware()
const Store = () => {
  const middlewares = [sagaMiddleware]
  
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(
      applyMiddleware(...middlewares),
  )

  const store = createStore(rootReducer, {}, enhancer)
  
  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default Store
