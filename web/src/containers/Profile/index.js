import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import hamburger from 'lib/images/hamburger.png'

import './index.css';

import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import UserSummary from 'components/UserSummary';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  viewMenu = () => {
    this.props.navigate(`/menu`);
  }

  render() {
    return (
      <div className='profile' onClick={this.viewMenu}>
        <UserSummary user={this.props.user} className="profile"/>
      </div>
    );
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
  'navigate',
]);

const stateMapper = getRdxSelectionMapper({
  user: 'getUser',
  logged_in: 'getLoggedIn',
});

export default connect(stateMapper, actionsMapper)(Profile);
