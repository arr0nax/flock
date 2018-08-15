import { compose, createStore, applyMiddleware  } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';


const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

export function configureStore(preloadedState) {
  let store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        loggerMiddleware,
        sagaMiddleware
      )
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;
}
