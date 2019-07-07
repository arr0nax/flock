import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView, RefreshControl, FlatList } from 'react-native';
import actions from '../actions';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import {default as Notifications} from 'mobile/components/notifications';
import {default as Posts} from 'mobile/containers/posts';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';
import {default as ImageUpload} from 'mobile/components/image-upload';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      post: "",
    }
  }

  handleLogin() {
    this.props.requestLogin({
      email: this.state.email,
      password: this.state.password,
    })
  }

  handleLogout() {
    this.props.requestLogout()
  }

  handleRegister() {
    this.props.requestRegister({
      email: this.state.email,
      password: this.state.password,
    })
  }

  handlePost() {
    this.props.postPost({
      text: this.state.post
    })
  }

  handleChangePost(event) {
    this.setState({post: event.target.value});
  }


  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Text style>logged in as: {`${this.props.user.first_name} ${this.props.user.last_name}`}</Text>
          {/*<Image source={{ uri: this.props.user.image }} style={{ width: 50, height: 50 }} />
          <ImageUpload auth={this.props.auth} />*/}
          <Button
            onPress={() => this.handleLogout()}
            title="logout"
            color="#add8e6"
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

Settings.propTypes = {

};

Settings.defaultProps = {
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

export default connect(stateMapper, actionsMapper)(Settings);
