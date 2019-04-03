import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    console.log(props.pathname);
    // props.getPost()
  }
  render() {
    return (
      <div className="details-page-rct-component">
        <p>reported post</p>
      </div>
    );
  }
}

DetailsPage.propTypes = {
};

DetailsPage.defaultProps = {
};

const actionsMapper = getRdxActionMapper([

]);

const stateMapper = getRdxSelectionMapper({
  pathname: 'getPathname',
});

export default connect(stateMapper, actionsMapper)(DetailsPage);
