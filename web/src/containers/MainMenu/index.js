import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';

import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import UserSummary from 'components/UserSummary';


class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleLogout() {
    this.props.requestLogout();
  }

  render() {
    return (
      <div className='main-menu'>
        <UserSummary user={this.props.user}/>
        <div className="details">
          <button onClick={() => this.handleLogout()}>logout</button>
          {/*<UpdateGroup />*/}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  }
}

MainMenu.propTypes = {

};

MainMenu.defaultProps = {
  postLogout: () => {},
};

const actionsMapper = getRdxActionMapper([
  'requestLogout',
]);

const stateMapper = getRdxSelectionMapper({

});

export default connect(stateMapper, actionsMapper)(MainMenu);
