import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import {login} from './actions/auth';
import {post, getPosts} from './actions/posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      post: '',
    }
    this.props.dispatch(getPosts());
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleChangePost(event) {
    this.setState({post: event.target.value});
  }

  handleLogin() {
    this.props.dispatch(login({
      username: this.state.username,
      password: this.state.password,
    }))
  }

  handlePost() {
    this.props.dispatch(post({
      content: this.state.post
    }))
  }

  posts() {
    return this.props.posts.posts.map(post => <text>{post.content}</text>);
  }

  render() {
    return (
      <div className="App">
        <div>
          <input value={this.state.username} onChange={(e) => this.handleChangeUsername(e)}/>
          <input type="password" value={this.state.password} onChange={(e) => this.handleChangePassword(e)}/>
          <div className="button" onClick={() => this.handleLogin()}>
            <text>login</text>
          </div>
        </div>
        <div>
          <input value={this.state.post} onChange={(e) => this.handleChangePost(e)} />
          <div className="button" onClick={() => this.handlePost()}>
            <text>post</text>
          </div>
        </div>
        <div>
          {this.posts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
    posts: state.posts,
  }
}

export default connect(mapStateToProps)(App);
