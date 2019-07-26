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

  viewAbout = () => {
    this.props.navigate(`/about`);
  }

  goHome = () => {
    this.props.navigate(`/`);
  }

  render() {
    return (
      <div className='main-menu'>
        <div className="home-button-container">
          <button onClick={() => this.goHome()}>home</button>
        </div>
        <UserSummary user={this.props.user}/>
        <div className="details">
          <button onClick={() => this.handleLogout()}>logout</button>
          {/*<UpdateGroup />*/}
        </div>
        <div className="more-info" onClick={this.viewAbout}>
          <p>about flock</p>
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
  'navigate',
]);

const stateMapper = getRdxSelectionMapper({
  user: 'getUser',
});

export default connect(stateMapper, actionsMapper)(MainMenu);
