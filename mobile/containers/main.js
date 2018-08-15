import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { login } from '../actions/auth';
import { getPosts, post } from '../actions/posts';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      content: "",
    }

    this.props.dispatch(getPosts());
  }

  handleLogin() {
    this.props.dispatch(login({
      username: this.state.username,
      password: this.state.password,
    }))
  }

  handlePost() {
    this.props.dispatch(post({
      content: this.state.content
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
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
        <View>
          <TextInput
            style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(content) => this.setState({content})}
            value={this.state.content}
          />
          <Button
            onPress={() => this.handlePost()}
            title="post"
            color="#841584"
          />
        </View>
        <View>
          {this.props.posts.posts.map(post => <Text>{post.content}</Text>)}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
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

export default connect(mapStateToProps)(Main)
