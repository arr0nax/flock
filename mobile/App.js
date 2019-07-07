console.disableYellowBox = true;
import {default as React} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import {default as configureStore} from 'mobile/rdx/configureStore'
import {default as configureSockets} from 'mobile/rdx/configureSockets'
import {default as Main} from 'mobile/containers/main.js';
import {default as AuthGuard} from 'mobile/containers/authguard.js';
import {default as Expo} from 'expo';
import SocketIOClient from 'socket.io-client';
import {default as Env} from 'mobile/env.js'

const { store, persistor } = configureStore();

async function alertIfCameraRollDisabledAsync() {
  const { Permissions } = Expo;
  const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    getCameraRollAsync();
  }
}

async function getCameraRollAsync() {
  const { Location, Permissions } = Expo;
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === 'granted') {
    return null;
  } else {
    throw new Error('Location permission not granted');
  }
}

export default class App extends React.Component {
  componentDidMount() {
    const socket = SocketIOClient(Env.API_ENDPOINT);
    configureSockets(socket, store)
  }
  render() {
    // alertIfCameraRollDisabledAsync();
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <AuthGuard />
          <Main style={styles.container}/>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
