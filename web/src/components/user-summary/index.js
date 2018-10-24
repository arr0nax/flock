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
        <text>{this.props.user.first_name} {this.props.user.last_name}</text>
        <img src={this.props.user.image_url} />
      </div>
    );
  }
}

export default UserSummary;
