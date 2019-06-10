import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';


import logo from 'logo.svg';
import './index.css';

import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import ReactCarousel from 'components/ReactCarousel';
import FileUpload from 'components/FileUpload';
import UserSummary from 'components/UserSummary';
import UpdateGroup from 'components/UpdateGroup';
import LoginForm from 'containers/LoginForm';
import Post from 'containers/Post';
import NewPost from 'containers/NewPost';
import Notifications from 'containers/Notifications';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    if (this.props.logged_in) this.props.getNotifications();
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


  render() {
    return (
      <div className='profile'>
        <div onClick={() => this.setState({open:!this.state.open})}>
        <UserSummary user={this.props.user}/>
        </div>
        <div className={`details ${this.state.open && 'open'}`}>
          <div className="button" onClick={() => this.handleLogout()}>
            <p>logout</p>
          </div>
          <FileUpload item_id={this.props.user.id} auth={this.props.auth}/>
          <UpdateGroup />
          <Notifications />
          <div>
            <button onClick={() => this.props.getPosts()}>refresh</button>
          </div>
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

Profile.propTypes = {

};

Profile.defaultProps = {
  getPosts: () => {},
  postLogout: () => {},
  auth: {},
  posts: {posts: []}
};

const actionsMapper = getRdxActionMapper([
  'getPosts',
  'getMorePosts',
  'requestLogin',
  'requestLogout',
  'postComment',
  'postReply',
  'postReact',
  'getNotifications',
  'requestRegister',
  'composePost'
]);

const stateMapper = getRdxSelectionMapper({
  auth: 'getAuthToken',
  user: 'getUser',
  usersRequested: 'getUsersRequested',
  users: 'getUsers',
  logged_in: 'getLoggedIn',
  posts: 'getPosts',
  postsRequested: 'getPostsRequested',
  postsPagination: 'getPostsPagination',
  comments: 'getComments',
  commentsRequested: 'getCommentsRequested',
  replies: 'getReplies',
  repliesRequested: 'getRepliesRequested',
  post_reacts: 'getPostReacts',
  comment_reacts: 'getCommentReacts',
  reply_reacts: 'getReplyReacts',
  postReactsRequested: 'getPostReactsRequested',
  commentReactsRequested: 'getCommentReactsRequested',
  replyReactsRequested: 'getReplyReactsRequested',
  notifications: 'getNotifications',
});

export default connect(stateMapper, actionsMapper)(Profile);
