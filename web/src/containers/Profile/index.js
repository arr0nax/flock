import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import hamburger from 'lib/images/hamburger.png'

import './index.css';

import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import UserSummary from 'components/UserSummary';
import Notifications from 'containers/Notifications';
import Reports from 'containers/Reports';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    if (this.props.logged_in) {
      this.props.getNotifications();
      this.props.getReports();
    }

  }

  viewMenu = () => {
    this.props.navigate(`/menu`);
  }

  viewNotifications = () => {
    this.props.navigate(`/notifications`);
  }

  viewReports = () => {
    this.props.navigate(`/reports`);
  }

  render() {
    const newNotifs = this.props.notifications.reduce((acc, curr) => {
      console.log(curr, acc);
      return curr.new ? acc+=1 : acc
    }, 0);
    console.log(newNotifs);
    return (
      <div className='profile'>
        <div className='user-summary-container' onClick={this.viewMenu}>
          <UserSummary user={this.props.user} className="profile" gear/>
        </div>
        <div className='reports-button-container'>
          <button onClick={this.viewReports}>reports</button>
          {this.props.reports.length ? <div className='reports-alert-icon'>{this.props.reports.length}</div> : null}
        </div>
        <div className='notifications-button-container'>
          <button onClick={this.viewNotifications}>notifications</button>
          {newNotifs ? <div className='notifications-alert-icon'>{newNotifs}</div> : null}
        </div>
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
  'getNotifications',
  'getReports'
]);

const stateMapper = getRdxSelectionMapper({
  user: 'getUser',
  logged_in: 'getLoggedIn',
  reports: 'getReports',
  notifications: 'getNotifications',
});

export default connect(stateMapper, actionsMapper)(Profile);
