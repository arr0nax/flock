import React from 'react';
import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

export default function (ComposedComponent) {
class AuthGuard extends React.Component {
  render() {
    const { logged_in } = this.props;
    if (!logged_in) {
      return <Redirect to="/login" />;
    }
    return <ComposedComponent {...this.props} />;
  }
}

AuthGuard.propTypes = {
  authToken: PropTypes.string,
  // children: customPropTypes.children,
};

AuthGuard.defaultProps = {
  authToken: '',
  children: null,
};

const actionsMapper = getRdxActionMapper([
  'navigate'
]);

const stateMapper = getRdxSelectionMapper({
  logged_in: 'getLoggedIn',
});

return connect(stateMapper, actionsMapper)(AuthGuard);
}
