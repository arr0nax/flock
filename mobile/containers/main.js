import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView, RefreshControl, FlatList } from 'react-native';
import actions from '../actions';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import {default as Notifications} from 'mobile/components/notifications';
import {default as Posts} from 'mobile/containers/posts';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';
import {default as ImageUpload} from 'mobile/components/image-upload';

class Main extends React.Component {
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
      <View style={{flex: 1}}>
        {
          this.props.logged_in ? (
            <View>
              <Text>{this.props.user.first_name}
              {this.props.user.last_name}</Text>
              <Image source={{ uri: this.props.user.image }} style={{ width: 50, height: 50 }} />
              <ImageUpload auth={this.props.auth} />
              <Button
                onPress={() => this.handleLogout()}
                title="logout"
                color="#841584"
              />
              <Notifications />
            </View>
          ) : (
            <View>
              <TextInput
                style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
              <TextInput
                style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
              <Button
                onPress={() => this.handleLogin()}
                title="login"
                color="#841584"
              />
            </View>
          )
        }
        <View>
          <TextInput
            style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(post) => this.setState({post})}
            value={this.state.post}
          />
          <Button
            onPress={() => this.handlePost()}
            title="post"
            color="#841584"
          />
        </View>
        <Posts />
      </View>
    );
  }

  /*
  render() {
    return (
      <GestureResponder />
    )
  }
  */
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

Main.propTypes = {

};

Main.defaultProps = {
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

export default connect(stateMapper, actionsMapper)(Main);
