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

  mediaRef = React.createRef();

  handleLogout() {
    this.props.requestLogout();
  }

  viewAbout = () => {
    this.props.navigate(`/about`);
  }

  goHome = () => {
    this.props.navigate(`/`);
  }

  handleSubmit = () => {
    this.props.postAttachment({
      item_id: this.props.user.id,
      item_type: 'profile_picture',
      attachment: this.mediaRef.current.files[0]
    });
    this.mediaRef.current.value = null;
  }

  render() {
    return (
      <div className='main-menu'>
        <div className="home-button-container">
          <button onClick={() => this.goHome()}>home</button>
        </div>
        <UserSummary user={this.props.user}/>
        <input className={'add-image-input'} type="file" name={`profpicupload${this.props.user.id}`} id={`profpicupload${this.props.user.id}`} accept="image/*" encType="multipart/form-data" ref={this.mediaRef} onChange={this.handleSubmit}/>
        <label className={'add-image-label'} htmlFor={`profpicupload${this.props.user.id}`}></label>
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
  'postAttachment'
]);

const stateMapper = getRdxSelectionMapper({
  user: 'getUser',
});

export default connect(stateMapper, actionsMapper)(MainMenu);
