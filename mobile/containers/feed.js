import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView, RefreshControl, FlatList } from 'react-native';
import actions from '../actions';
import {default as Posts} from 'mobile/containers/posts';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';
import {default as ImageUpload} from 'mobile/components/image-upload';

class Feed extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
        <Posts />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

Feed.propTypes = {

};

Feed.defaultProps = {
  postLogin: () => {},
  postLogout: () => {},
  auth: {},
};

const actionsMapper = getRdxActionMapper([
  'requestLogin',
  'requestLogout',
  'postPost',
  'requestRegister'
]);

const stateMapper = getRdxSelectionMapper({
  auth: 'getAuthToken',
  user: 'getUser',
  logged_in: 'getLoggedIn',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reacts: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(stateMapper, actionsMapper)(Feed);
