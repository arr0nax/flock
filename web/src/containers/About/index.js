import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import sheepfault from 'lib/images/smallsheepboi.png'

import './index.css';

class About extends React.Component {
  constructor(props) {
    super(props);
  }
  goHome = () => {
    this.props.navigate('/');
  }
  render() {
    return (
      <div className="about-rct-component">
        <img id="main-logo-2" src={sheepfault} style={{backgroundColor: '#9ff'}} onClick={this.goHome}/>
        <h2>About Flock</h2>
        <div className="section">
          <p>Flock is a love letter to social media, designed and run by Clayton Online.</p>
          <p>Social media today has many problems, including a focus on advertising, unfair collection of sensitive data, and design that is intentionally addictive.</p>
          <p>Flock is attempting to address these issues by focusing on creating a more human experience. There are no profiles, DMs, or moderators, only group conversations where everyone can contribute and chat.</p>
          <p>On Flock, you will be able to talk to friends and strangers from all over the world. Be nice! You only get to be in one group, and your words will affect how people perceive you.</p>
          <p style={{fontStyle: 'italic'}}>Flock is run entirely out of pocket by Clayton Online. Thats why you will never see an ad or have your data sold. If you want to donate, please visit his <a href="https://www.patreon.com/claytononline" target='_blank'>patreon</a> or venmo @Clayton-Online.</p>
          <p style={{fontStyle: 'italic'}}>You can view his other projects at <a href="http://ciayton.online" target='_blank'>cIayton.online</a></p>
        </div>
      </div>
    );
  }
}

About.propTypes = {
};

About.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'navigate',
]);

const stateMapper = getRdxSelectionMapper({

});

export default connect(stateMapper, actionsMapper)(About);
