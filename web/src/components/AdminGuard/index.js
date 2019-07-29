import React from 'react';
import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

export default function (ComposedComponent) {
class AdminGuard extends React.Component {
  render() {
    const { user } = this.props;
    if (user.data && (user.data.role != 2)) {
      return <Redirect to="/login" />;
    }
    return <ComposedComponent {...this.props} />;
  }
}

AdminGuard.propTypes = {
  authToken: PropTypes.string,
  // children: customPropTypes.children,
};

AdminGuard.defaultProps = {
  authToken: '',
  children: null,
};

const actionsMapper = getRdxActionMapper([
  'navigate'
]);

const stateMapper = getRdxSelectionMapper({
  user: 'getUser',
});

return connect(stateMapper, actionsMapper)(AdminGuard);
}
