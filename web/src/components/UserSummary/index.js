import React from 'react';
import sheepfault from 'lib/images/smallersheepboi.png'

import './index.css';

class UserSummary extends React.Component {
  constructor(props) {
    super(props);
    const color = this.getColor(props.user.first_name)
    this.state = {color};
  }

  getColor(name) {
    let color = '#9ff'
    if (name) {
      var code1 = (name.toUpperCase().charCodeAt(0) - 64) * 10;
      var code2 = (name.toUpperCase().charCodeAt(1) - 64) * 10;
      var code3 = (name.toUpperCase().charCodeAt(2) - 64) * 10;
      color = `rgb(${code1},${code2},${code3})`
    }
    return color
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.first_name !== prevProps.user.first_name) {
      this.setState({color: this.getColor(this.props.user.first_name)})
    }
  }

  addDefaultSrc(ev){
    ev.target.src = sheepfault;
  }

  render() {
    return (
      <div className={`user-summary ${this.props.className}`}>
        <img src={this.props.user.image_url || sheepfault} onError={this.addDefaultSrc} style={{backgroundColor: this.state.color}}/>
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
  user: {
    first_name: '',
  },
};


export default UserSummary;
