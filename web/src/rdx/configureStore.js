import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import actions from 'rdx/modules/activeRequests/types'

import compileReducers from 'rdx/reducers';
import rootSaga from 'rdx/sagas';

const initialState = {};

// middlewares
const loggerMiddleware = createLogger({
  predicate: (getState, action) => (action.type !== actions.ADD_ACTIVE_REQUEST) && (action.type !== actions.REMOVE_ACTIVE_REQUEST)
});
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'flock_frontend',
  storage,
  whitelist: [
    'authToken',
    'user',
    'logged_in',
    'group'
  ],
};

const configureStore = (history) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  if (process.env.REACT_APP_ENABLE_LOGGER_MIDDLEWARE) {
    middlewares.push(loggerMiddleware);
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const persistedRootReducer = persistReducer(persistConfig, compileReducers());

  const store = createStore(
    connectRouter(history)(persistedRootReducer),
    initialState,
    composeWithDevTools(...enhancers),
  );

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  if (process.env.REACT_APP_PURGE_RDX_PERSIST_STORE) {
    persistor.purge();
  }

  return { store, persistor };
};

export default configureStore;
