import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
// import customPropTypes from 'lib/customPropTypes';
import classNames from 'classnames';

import './index.css';

const ExpandingTextInput = (props) => {
  const { className, value, handleChange, handleSubmit, id, placeholder, rows, noReturn } = props;

  const checkForSubmit = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !noReturn) {
      handleSubmit(id);
    }
  }
  return (
    <div className={classNames(
      "expanding-text-input-rct-component",
      className,
    )}>
      <Textarea className="expanding-text-input" value={value} onChange={(e) => handleChange(e, id)} placeholder={placeholder} onKeyUp={checkForSubmit} style={{minHeight: rows ? `${17 * rows}px` : 'auto'}}/>
    </div>
  );
}

ExpandingTextInput.propTypes = {
  className: PropTypes.string,
};

ExpandingTextInput.defaultProps = {
  className: '',
};

export default ExpandingTextInput;
