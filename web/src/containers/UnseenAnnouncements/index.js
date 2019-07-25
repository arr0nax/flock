import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import Announcement from 'components/Announcement'

import './index.css';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.props.getAnnouncements();

  }

  announcements = () => {
    if (!this.props.announcements || !this.props.announcements.length) return null;
    return this.props.announcements.map(announcement => {
      return (
        <Announcement announcement={announcement} />
      )
    });
  }
  render() {
    return (
      <div className="unseen-announcements-rct-component">
        {/*<button onClick={this.toggleOpen}>reports</button>*/}
        {this.announcements()}
      </div>
    )
  }
}

Reports.propTypes = {
};

Reports.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'getAnnouncements',
]);

const stateMapper = getRdxSelectionMapper({
  announcements: 'getNewAnnouncements'
});

export default connect(stateMapper, actionsMapper)(Reports);
