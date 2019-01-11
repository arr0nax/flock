import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import { default as storage} from 'redux-persist/lib/storage'; // localStorage
import { default as createSagaMiddleware} from 'redux-saga';
import { createLogger } from 'redux-logger';
import Env from 'mobile/env.js';

// import { connectRouter, routerMiddleware } from 'connected-react-router';

import compileReducers from 'mobile/rdx/reducers';
import rootSaga from 'mobile/rdx/sagas';

const initialState = {};

// middlewares
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'flock_mobile',
  storage,
  whitelist: [
    'authToken',
    'user',
    'logged_in',
  ],
};

const configureStore = () => {
  const middlewares = [
    sagaMiddleware,
    // routerMiddleware(history),
  ];

  if (true) {
    middlewares.push(loggerMiddleware);
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const persistedRootReducer = persistReducer(persistConfig, compileReducers());

  const store = createStore(
    persistedRootReducer,
    initialState,
    composeWithDevTools(...enhancers),
  );

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  if (Env.ENABLE_PERSISTOR_PURGE) {
    persistor.purge();
  }

  return { store, persistor };
};

export default configureStore;
