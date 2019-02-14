import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }
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

  handleLogin() {
    this.props.requestLogin({
      email: this.state.email,
      password: this.state.password,
    });
  }

  handleRegister() {
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
        <div>
          <input placeholder="first name" value={this.state.first_name} onChange={(e) => this.handleChangeFirstName(e)}/>
          <input placeholder="last name" value={this.state.last_name} onChange={(e) => this.handleChangeLastName(e)}/>
        </div>
        <div>
          <input placeholder="email" value={this.state.email} onChange={(e) => this.handleChangeEmail(e)}/>
          <input placeholder="password" type="password" value={this.state.password} onChange={(e) => this.handleChangePassword(e)}/>
        </div>
        <div>
          <p onClick={() => this.handleLogin()}>login</p>
          <p onClick={() => this.handleRegister()}>register</p>
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
  'requestRegister'
]);

const stateMapper = getRdxSelectionMapper({
});

export default connect(stateMapper, actionsMapper)(LoginForm);
