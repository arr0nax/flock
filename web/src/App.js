import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';

import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import ReactCarousel from './components/ReactCarousel';
import FileUpload from './components/FileUpload';
import UserSummary from './components/UserSummary';
import UpdateGroup from './components/UpdateGroup';
import LoginForm from './containers/LoginForm';
import Post from './containers/Post';
import Notifications from './containers/Notifications';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      post: '',
      comment: {},
      reply: {}
    }
    this.props.getPosts();
    if (this.props.logged_in) this.props.getNotifications();
  }

  handleChangeFirstName(event) {
    this.setState({first_name: event.target.value});
  }

  handleChangeLastName(event) {
    this.setState({last_name: event.target.value});
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleChangePost(event) {
    this.setState({post: event.target.value});
  }

  handleChangeComment(event, post) {
    var newComment = {
      ...this.state.comment
    };
    newComment[post.id] = event.target.value;
    this.setState({comment: newComment});
  }

  handleChangeReply(event, comment) {
    var newReply = {
      ...this.state.reply
    };
    newReply[comment.id] = event.target.value;
    this.setState({reply: newReply});
  }

  handleLogin() {
    this.props.requestLogin({
      email: this.state.email,
      password: this.state.password,
    });
  }

  handleLogout() {
    this.props.requestLogout();
  }

  handleRegister() {
    this.props.requestRegister({
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    })
  }

  handlePost() {
    this.props.postPost({
      text: this.state.post
    })
  }

  posts() {
    return this.props.posts.map(post => {
      return (
        <Post
          key={`post${post.id}`}
          post={post}
          showComments
          allowComment
          showReplies
          allowReply
          allowReact
        />
      )
    });
  }

  render() {
    return (
      <div className="App">
      {this.props.logged_in ? (
        <div>
          <div className="button" onClick={() => this.handleLogout()}>
            <p>{this.props.user.first_name} {this.props.user.last_name}</p>
            <img src={this.props.user.image_url} />
            <p>logout</p>
          </div>
          <FileUpload item_id={this.props.user.id} auth={this.props.auth}/>
          <UpdateGroup />
          <Notifications />
        </div>
      ) : (
        <div>
          <LoginForm />
        </div>
      )}
        <div>
          <input value={this.state.post} onChange={(e) => this.handleChangePost(e)} />
          <div className="button" onClick={() => this.handlePost()}>
            <p>post</p>
          </div>
        </div>
        <div className="posts">
          {this.posts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    users: state.users,
    posts: state.posts,
    comments: state.comments,
    replies: state.replies,
    reacts: state.reacts,
    notifications: state.notifications,
  }
}

App.propTypes = {

};

App.defaultProps = {
  getPosts: () => {},
  postLogout: () => {},
  auth: {},
  posts: {posts: []}
};

const actionsMapper = getRdxActionMapper([
  'getPosts',
  'requestLogin',
  'requestLogout',
  'postPost',
  'postComment',
  'postReply',
  'postReact',
  'getNotifications',
  'requestRegister'
]);

const stateMapper = getRdxSelectionMapper({
  auth: 'getAuthToken',
  user: 'getUser',
  users: 'getUsers',
  logged_in: 'getLoggedIn',
  posts: 'getPosts',
  comments: 'getComments',
  replies: 'getReplies',
  post_reacts: 'getPostReacts',
  comment_reacts: 'getCommentReacts',
  reply_reacts: 'getReplyReacts',
  notifications: 'getNotifications',
});

export default connect(stateMapper, actionsMapper)(App);
