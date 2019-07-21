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
import Reports from 'containers/Reports';


class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
        <UserSummary user={this.props.user}/>
        <div className="details">
          <div className="button" onClick={() => this.handleLogout()}>
            <p>logout</p>
          </div>
          {/*<UpdateGroup />*/}
          <Reports />
          <Notifications />
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

MainMenu.propTypes = {

};

MainMenu.defaultProps = {
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

export default connect(stateMapper, actionsMapper)(MainMenu);
