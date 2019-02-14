import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class UpdateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    }
  }
  render() {
    return (
      <div className="update-group-rct-component">
        <input placeholder="group code" value={this.state.code} onChange={(e) => {this.setState({code: e.target.value})}}/>
        <button onClick={() => {this.props.patchUserGroup(this.state.code)}}>Update</button>
      </div>
    );
  }
}

UpdateGroup.propTypes = {
};

UpdateGroup.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'patchUserGroup'
]);

const stateMapper = getRdxSelectionMapper({
});

export default connect(stateMapper, actionsMapper)(UpdateGroup);
