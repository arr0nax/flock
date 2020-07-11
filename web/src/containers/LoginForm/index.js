import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';
import sheepfault from 'lib/images/smallsheepboi.png'

import './index.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      email2: '',
      password2: '',
    }
    if (props.logged_in) props.navigate('/');
  }

  handleChangeFirstName(event) {
    this.setState({first_name: event.target.value});
  }

  handleChangeLastName(event) {
    this.setState({last_name: event.target.value});
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleChangeEmail2(event) {
    this.setState({email2: event.target.value});
  }

  handleChangePassword2(event) {
    this.setState({password2: event.target.value});
  }

  viewAbout = () => {
    this.props.navigate(`/about`);
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.requestLogin({
      email: this.state.email2,
      password: this.state.password2,
    });
  }

  handleRegister = (e) => {
    e.preventDefault();
    this.props.requestRegister({
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    })
  }

  render() {
    return (
      <div className="login-form-rct-component">
        <img id="main-logo" src={sheepfault} style={{backgroundColor: '#9ff'}}/>
        <div className="main-container">
          <div className="login-container">
              <input placeholder="email" value={this.state.email2} onChange={(e) => this.handleChangeEmail2(e)}/>
              <form onSubmit={this.handleLogin}>
              <input placeholder="password" type="password" value={this.state.password2} onChange={(e) => this.handleChangePassword2(e)}/>
              </form>
            <div className='errors'>
              <p>{this.props.error ? this.props.error.text : ''}</p>
            </div>
            <button onClick={(e) => this.handleLogin(e)}>login</button>
          </div>
          <div className="divider" />
          <div className="register-container">

              <input placeholder="first name" value={this.state.first_name} onChange={(e) => this.handleChangeFirstName(e)}/>
              <input placeholder="last name" value={this.state.last_name} onChange={(e) => this.handleChangeLastName(e)}/>
              <input placeholder="email" value={this.state.email} onChange={(e) => this.handleChangeEmail(e)}/>
              <form onSubmit={this.handleRegister}>
              <input placeholder="password" type="password" value={this.state.password} onChange={(e) => this.handleChangePassword(e)}/>
              </form>
              <p className='info'>
                  Your first and last name will be displayed in the app. Your email will only be used to recover your password - we will never email you directly.
              </p>
            <div className='successes'>
              <p>{this.props.regerror ? this.props.regerror.text : ''}</p>
            </div>
            <button onClick={(e) => this.handleRegister(e)}>register</button>
          </div>
        </div>
        <div className="more-info" onClick={this.viewAbout}>
          <p>about flock</p>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
};

LoginForm.defaultProps = {
  requestLogin: () => {},
  requestRegister: () => {},
};

const actionsMapper = getRdxActionMapper([
  'requestLogin',
  'requestRegister',
  'navigate',
]);

const stateMapper = getRdxSelectionMapper({
  error: 'getLoginError',
  regerror: 'getRegisterError',
  logged_in: 'getLoggedIn',
});

export default connect(stateMapper, actionsMapper)(LoginForm);
