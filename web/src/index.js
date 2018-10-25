import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import createHistory from 'history/createBrowserHistory';

import configureStore from 'rdx/configureStore';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();

const { store, persistor } = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
