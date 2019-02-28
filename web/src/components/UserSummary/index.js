import React from 'react';
import sheepfault from 'lib/images/smallsheepboi.gif'

import './index.css';

class UserSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={`user-summary ${this.props.className}`}>
        <img src={this.props.user.image_url || sheepfault} />
        <div className='text'>
          <p>{this.props.user.first_name} {this.props.user.last_name}</p>
          <p>{this.props.subtext}</p>
        </div>
      </div>
    );
  }
}

UserSummary.propTypes = {

};

UserSummary.defaultProps = {
  user: {},
};


export default UserSummary;
