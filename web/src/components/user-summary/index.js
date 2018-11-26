import React from 'react';

import './index.css';

class UserSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-summary">
        <img src={this.props.user.image_url} />
        <text>{this.props.user.first_name} {this.props.user.last_name}</text>
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
