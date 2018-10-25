import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';

import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import ReactCarousel from './components/react-carousel';
import FileUpload from './components/file-upload';
import UserSummary from './components/user-summary';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      post: '',
      comment: {},
      reply: {}
    }
    this.props.getPosts();
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
    this.props.register({
      email: this.state.email,
      password: this.state.password,
      first_name: 'double',
      last_name: 'chicken',
    })
  }

  handlePost() {
    this.props.postPost({
      text: this.state.post
    })
  }

  handleComment(post) {
    this.props.postComment({
      text: this.state.comment[post.id],
      post_id: post.id,
    })
    var newComment = {
      ...this.state.comment
    };
    newComment[post.id] = '';
    this.setState({comment: newComment});
  }

  handleReply(post, comment) {
    this.props.reply({
      text: this.state.reply[comment.id],
      post_id: post.id,
      comment_id: comment.id,
    })
    var newReply = {
      ...this.state.reply
    };
    newReply[comment.id] = '';
    this.setState({reply: newReply});
  }

  handleReact(react, item_id, type) {
    this.props.react({
      react,
      item_id,
      type,
    })
  }

  notifications() {
    return this.props.notifications.notifications.map(notif => (
      <div className="notification">
        <text>{notif.made_by} left a {notif.item_type} on your {notif.parent_id}</text>
      </div>
    ))};

  replies(comment) {
    if (comment) {
      return this.props.replies[comment.id] && this.props.replies[comment.id].map(reply => (
        <div className="reply">
          {/*<UserSummary user={this.props.users.users[reply.user_id]} />*/}
          <text>{reply.text}</text>
          {this.reacts(reply, 'reply')}
          <ReactCarousel react={this.handleReact.bind(this)} item_id={reply.id} type="reply"/>
        </div>
      ));
    }
  }

  reacts(item, type) {
    if (item) {
      if (type === 'post') {
        return this.props.post_reacts[item.id] && this.props.post_reacts[item.id].map(react => {
          return <text>{react.react}</text>;
        })
      } else if (type === 'comment') {
        return this.props.comment_reacts[item.id] && this.props.comment_reacts[item.id].map(react => {
          return <text>{react.react}</text>;
        })
      } else if (type === 'reply') {
        return this.props.reply_reacts[item.id] && this.props.reply_reacts[item.id].map(react => {
          return <text>{react.react}</text>;
        })
      }
    }
  }

  comments(post) {
    return this.props.comments[post.id] && this.props.comments[post.id].map(comment => {
      return (
        <div className="comment">
          {/*<UserSummary user={this.props.users.users[comment.user_id]} /> */}
          <text>{comment.text}</text>
          <div className="reacts">
            {this.reacts(comment, 'comment')}
          </div>
          <ReactCarousel react={this.handleReact.bind(this)} item_id={comment.id} type="comment"/>
          <div className="replies">
            {this.replies(comment)}
            <input value={this.state.reply[comment.id]} onChange={(e) => this.handleChangeReply(e, comment)} />
            <div className="button" onClick={() => this.handleReply(post, comment)}>
              <text>reply</text>
            </div>
          </div>
        </div>
      )
    });
  }

  posts() {
    return this.props.posts.map(post => {
      return (
        <div className="post">
          {/* <UserSummary user={this.props.users.users[post.user_id]} */}
          <text>{post.text}</text>
          <div className="reacts">
            {this.reacts(post, 'post')}
          </div>
          <ReactCarousel react={this.handleReact.bind(this)} item_id={post.id} type="post"/>
          <div className="comments">
            {this.comments(post)}
            <input value={this.state.comment[post.id]} onChange={(e) => this.handleChangeComment(e, post)} />
            <div className="button" onClick={() => this.handleComment(post)}>
              <text>comment</text>
            </div>
          </div>
        </div>
      )
    });
  }

  render() {
    return (
      <div className="App">
      {this.props.logged_in ? (
        <div>
          <div className="button" onClick={() => this.handleLogout()}>
            <text>{this.props.user.first_name} {this.props.user.last_name}</text>
            <img src={this.props.user.image_url} />
            <text>logout</text>
          </div>
          <FileUpload item_id={this.props.user.id}/>
          {/* this.notifications() */}
        </div>
      ) : (
        null
      )}
        <div>
          <input value={this.state.email} onChange={(e) => this.handleChangeEmail(e)}/>
          <input type="password" value={this.state.password} onChange={(e) => this.handleChangePassword(e)}/>
          <div className="button" onClick={() => this.handleLogin()}>
            <text>login</text>
          </div>
          <div className="button" onClick={() => this.handleRegister()}>
            <text>register</text>
          </div>
        </div>
        <div>
          <input value={this.state.post} onChange={(e) => this.handleChangePost(e)} />
          <div className="button" onClick={() => this.handlePost()}>
            <text>post</text>
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
  postLogin: () => {},
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
]);

const stateMapper = getRdxSelectionMapper({
  auth: 'getAuth',
  user: 'getUser',
  logged_in: 'getLoggedIn',
  posts: 'getPosts',
  comments: 'getComments',
  replies: 'getReplies',
  post_reacts: 'getPostReacts',
  comment_reacts: 'getCommentReacts',
  reply_reacts: 'getReplyReacts',
});

export default connect(stateMapper, actionsMapper)(App);
