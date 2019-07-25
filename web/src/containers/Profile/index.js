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
      this.props.getReportVotes();
      this.props.getAnnouncements();
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

  viewAnnouncements = () => {
    this.props.navigate(`/announcements`);
  }

  render() {
    const newNotifs = this.props.notifications.reduce((acc, curr) => {
      return curr.new ? acc+=1 : acc
    }, 0);
    return (
      <div className='profile-rct-component'>
        <div className='user-summary-container' onClick={this.viewMenu}>
          <UserSummary user={this.props.user} className="profile" gear/>
        </div>
        <div className='button-container'>
          <button onClick={this.viewReports}>reports</button>
          {this.props.reports ? <div className='alert-icon'>{this.props.reports}</div> : null}
        </div>
        <div className='button-container'>
          <button onClick={this.viewNotifications}>notifications</button>
          {newNotifs ? <div className='alert-icon'>{newNotifs}</div> : null}
        </div>
        <div className='button-container'>
          <button onClick={this.viewAnnouncements}>announcements</button>
          {this.props.announcements.length ? <div className='alert-icon'>{this.props.announcements.length}</div> : null}
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
  'getAnnouncements',
  'getReports',
  'getReportVotes'
]);

const stateMapper = getRdxSelectionMapper({
  user: 'getUser',
  logged_in: 'getLoggedIn',
  reports: 'getNewReportsCount',
  notifications: 'getNotifications',
  announcements: 'getNewAnnouncements'
});

export default connect(stateMapper, actionsMapper)(Profile);
