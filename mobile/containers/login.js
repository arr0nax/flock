import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import actions from '../actions';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import {default as Notifications} from 'mobile/components/notifications';
import {default as Posts} from 'mobile/containers/posts';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';
import {default as ImageUpload} from 'mobile/components/image-upload';

class Login extends React.Component {
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

  handleQuickLogin() {
    this.props.requestLogin({
      email: 'danger',
      password: 'string',
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

  handleChangePost(event) {
    this.setState({post: event.target.value});
  }


  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../lib/images/smallsheepboi.png')} style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#add8e6" }} />
        <TextInput
          style={{height: 40, width: '60%', borderColor: 'gray', borderWidth: 0, borderBottomWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder={'email'}
        />
        <TextInput
          style={{height: 40, width: '60%', borderColor: 'gray', borderWidth: 0, borderBottomWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder={'password'}
          secureTextEntry={true}
          onSubmitEditing={() => this.handleLogin()}
        />
        <Button
          onPress={() => this.handleLogin()}
          title="login"
          color="#add8e6"
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

Login.propTypes = {

};

Login.defaultProps = {
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

export default connect(stateMapper, actionsMapper)(Login);
