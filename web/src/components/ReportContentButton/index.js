import React from 'react';
import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class ReportContentButton extends React.Component {

  sendReport = () => {
    const {item_id, item_type} = this.props;
    this.props.postReport({
      item_id,
      item_type,
    })
  }
  render() {
    const { className } = this.props;
    return (
      <div className={classNames(
        "report-content-button-rct-component",
        className,
      )}>
        <p onClick={() => this.sendReport()}>report</p>
      </div>
    );
  }
}

ReportContentButton.propTypes = {
  className: PropTypes.string,
  item_type: PropTypes.string,
  item_id: PropTypes.number
};

ReportContentButton.defaultProps = {
  className: '',
  item_type: '',
  item_id: 0,
};

const actionsMapper = getRdxActionMapper([
  'postReport'
]);

const stateMapper = getRdxSelectionMapper({
});

export default connect(stateMapper, actionsMapper)(ReportContentButton);
