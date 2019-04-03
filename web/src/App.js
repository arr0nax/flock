import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';


import logo from './logo.svg';
import './App.css';

import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import LoginForm from './containers/LoginForm';
import RootRouter from './containers/RootRouter';


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
          <RootRouter />
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

export default withRouter(connect(stateMapper, actionsMapper)(App));
