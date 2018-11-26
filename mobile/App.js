import {default as React} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import {default as configureStore} from 'mobile/rdx/configureStore'
import {default as Main} from 'mobile/containers/main.js';
import {default as Expo} from 'expo';

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
  render() {
    alertIfCameraRollDisabledAsync();
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Main style={styles.container}/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
