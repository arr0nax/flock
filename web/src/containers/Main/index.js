import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';


import logo from 'logo.svg';
import './index.css';

import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import Post from 'containers/Post';
import Profile from 'containers/Profile';
import Reports from 'containers/Reports';
import NewPost from 'containers/NewPost';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.props.getPosts({page: 1});
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

  loadFunc = () => {
    if (!this.props.postsRequested) {
      this.props.getMorePosts({page: (this.props.postsPagination.page + 1)});
    }
  }

  render() {
    return (
      <div className="Main">
        <div className="header">
        </div>
        <Profile />
        <Reports />
        <div className="new-post">
          <NewPost />
        </div>
        <div className="posts">
          <InfiniteScroll
              pageStart={0}
              loadMore={this.loadFunc}
              hasMore={(this.props.postsPagination.page < this.props.postsPagination.pageCount)}
              loader={<div className="loader" key={0}>Loading ...</div>}
          >
              {this.posts()}
          </InfiniteScroll>
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

Main.propTypes = {

};

Main.defaultProps = {
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
  user: 'getUser',
  posts: 'getPosts',
  postsRequested: 'getPostsRequested',
  postsPagination: 'getPostsPagination',
});

export default connect(stateMapper, actionsMapper)(Main);