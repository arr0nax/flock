import {default as React} from 'react';
import {connect} from 'react-redux';
import {Modal, View } from 'react-native';
import { default as Login } from 'mobile/containers/login.js'
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';

class AuthGuard extends React.Component {
  render() {
    const { logged_in, children } = this.props;
    if (!logged_in) {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}
        >
          <Login />
        </Modal>

      )
    }
    return <View />;
  }
}

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
  logged_in: 'getLoggedIn',
});

export default connect(stateMapper, actionsMapper)(AuthGuard);
