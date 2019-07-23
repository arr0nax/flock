import React from 'react';
import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
import classNames from 'classnames';
import moment from 'moment';

import './index.css';

const ReadableTimestamp = (props) => {
  const { className, timestamp } = props;
  return (
    <div className={classNames(
      "readable-timestamp-rct-component",
      className,
    )}>
      {moment(timestamp).fromNow()}
    </div>
  );
}

ReadableTimestamp.propTypes = {
  className: PropTypes.string,
};

ReadableTimestamp.defaultProps = {
  className: '',
};

export default ReadableTimestamp;
