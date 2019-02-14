import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class Notifications extends React.Component {
  render() {
    if (!this.props.notifications || !this.props.notifications.length) return null;
    return this.props.notifications.map(notif => (
      <div className={`notification ${notif.new ? 'new' : ''}`} key={`notif${notif.id}`}>
        <p>{notif.made_by} left a {notif.item_type} on your {notif.parent_type}</p>
      </div>
    ));
  }
}

Notifications.propTypes = {
};

Notifications.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
  notifications: 'getNotifications'
});

export default connect(stateMapper, actionsMapper)(Notifications);
