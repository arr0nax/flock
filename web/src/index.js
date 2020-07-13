import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import createHistory from 'history/createBrowserHistory';

import configureStore from 'rdx/configureStore';
import configureSockets from 'rdx/configureSockets';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const history = createHistory();

const { store, persistor } = configureStore(history);

const socket = io(API_ENDPOINT);
configureSockets(socket, store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'));
