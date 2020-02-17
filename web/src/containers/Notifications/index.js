import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';
import ReadableTimestamp from 'components/ReadableTimestamp';

import './index.css';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
    // if (props.logged_in) props.getNotifications();
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open})
  }

  goToDetails = (notif) => {
    if (notif.item_type === 'report') {
      this.props.navigate(`reports/${notif.parent_type}/${notif.parent_id}`);
    } else {
      this.props.navigate(`details/${notif.parent_type}/${notif.parent_id}`);
    }
  }

  goHome() {
    this.props.navigate('/');
  }

  getUserByID(id) {
    if (this.props.users[id]) return `${this.props.users[id].first_name} ${this.props.users[id].last_name}`;
    return id;
  }

  notifications = () => {
    if (!this.props.notifications || !this.props.notifications.length) return <div className="no-notifications"><p>no notifications!</p></div>;
    return this.props.notifications.map(notif => (
      <div className={`notification ${notif.new ? 'new' : ''}`} key={`notif${notif.id}`}>
        <p onClick={() => this.goToDetails(notif)}>{this.getUserByID(notif.made_by)} left a {notif.item_type} on your <span className="action-link">{notif.parent_type}</span></p>
        <ReadableTimestamp timestamp={notif.created_at}/>
      </div>
    ));
  }
  render() {
    return (
      <div className="notifications-rct-component">
        {/*<button onClick={this.toggleOpen}>notifications</button>*/}
        <div className="home-button-container">
          <button onClick={() => this.goHome()}>home</button>
        </div>
        {this.state.open && (
          this.notifications()
        )}
      </div>
    )
  }
}

Notifications.propTypes = {
};

Notifications.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'navigate',
  'getNotifications',
]);

const stateMapper = getRdxSelectionMapper({
  notifications: 'getNotifications',
  logged_in: 'getLoggedIn',
  users: 'getUsers',
});

export default connect(stateMapper, actionsMapper)(Notifications);
