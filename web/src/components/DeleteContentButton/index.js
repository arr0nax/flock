import React from 'react';
import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class DeleteContentButton extends React.Component {

  deleteItem = () => {
    const {item_id, item_type} = this.props;
    this.props.deletePost(item_id);
  }
  render() {
    const { className, user_id, userID } = this.props;
    if (user_id !== userID) return null;
    return (
      <div className={classNames(
        "delete-content-button-rct-component",
        className,
      )}>
        <p onClick={() => this.deleteItem()}>delete</p>
      </div>
    );
  }
}

DeleteContentButton.propTypes = {
  className: PropTypes.string,
  item_type: PropTypes.string,
  item_id: PropTypes.number
};

DeleteContentButton.defaultProps = {
  className: '',
  item_type: '',
  item_id: 0,
};

const actionsMapper = getRdxActionMapper([
  'deletePost'
]);

const stateMapper = getRdxSelectionMapper({
  userID: 'getUserID'
});

export default connect(stateMapper, actionsMapper)(DeleteContentButton);
