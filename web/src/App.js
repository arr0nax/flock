import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';


import logo from './logo.svg';
import './App.css';

import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import ReactCarousel from './components/ReactCarousel';
import FileUpload from './components/FileUpload';
import UserSummary from './components/UserSummary';
import UpdateGroup from './components/UpdateGroup';
import LoginForm from './containers/LoginForm';
import Post from './containers/Post';
import Main from './containers/Main';
import NewPost from './containers/NewPost';
import Notifications from './containers/Notifications';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <div className="header">
        </div>
      {this.props.logged_in ? (
        <div>
          <Main />
        </div>
      ) : (
        <div>
          <LoginForm />
        </div>
      )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

App.propTypes = {

};

App.defaultProps = {
  getPosts: () => {},
  postLogout: () => {},
  auth: {},
  posts: {posts: []}
};

const actionsMapper = getRdxActionMapper([]);

const stateMapper = getRdxSelectionMapper({
  logged_in: 'getLoggedIn',
});

export default connect(stateMapper, actionsMapper)(App);
