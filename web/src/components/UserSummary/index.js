import React from 'react';
import sheepfault from 'lib/images/smallersheepboi.png'
import gear from 'lib/images/gear.png'
import ReadableTimestamp from 'components/ReadableTimestamp'

import './index.css';

const FILES_ENDPOINT = process.env.REACT_APP_FILES_ENDPOINT;

class UserSummary extends React.Component {
  constructor(props) {
    super(props);
    const color = this.getColor(props.user.first_name)
    this.state = {
      color,
      open: false
    };
  }

  openModal = () => {
    !this.state.open && this.setState({open: true})
  }

  closeModal = () => {
    this.state.open && this.setState({open: false})
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
    const { user } = this.props;
    return (
      <div className={`user-summary ${this.props.className} modal-${this.state.open ? 'open' : 'closed'}`} onClick={this.closeModal}>
        <img src={(user.id && user.image_url && user.image_url !== 'string') ? `${FILES_ENDPOINT}/profile_picture/${user.id}/${user.image_url}` : ''} onError={this.addDefaultSrc} style={{backgroundColor: this.state.color}} onClick={this.openModal}/>
        {this.props.gear && <img className="gear" src={gear}/>}
        <div className='text'>
          <p>{user.first_name} {user.last_name}</p>
          {this.props.timestamp ? <ReadableTimestamp timestamp={this.props.timestamp} /> : <p>{this.props.subtext}</p>}
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
