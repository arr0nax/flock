import React from 'react';
import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
import classNames from 'classnames';

import './index.css';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      open: false
    }
  }

  openModal = () => {
    !this.state.open && this.setState({open: true})
  }

  closeModal = () => {
    this.state.open && this.setState({open: false})
  }

  render() {
    const { className, source } = this.props;
    return (
      <div className={classNames(
        "image-rct-component",
        className,
        `modal-${this.state.open ? 'open' : 'closed'}`,
      )} onClick={this.closeModal}>
        <img src={source} onClick={this.openModal}/>
      </div>
    );
  }
}

Image.propTypes = {
  className: PropTypes.string,
};

Image.defaultProps = {
  className: '',
};

export default Image;
