import React from 'react';
import PropTypes from 'prop-types';
import ExpandingTextInput from 'components/ExpandingTextInput';
// import customPropTypes from 'lib/customPropTypes';
import classNames from 'classnames';

import './index.css';

class MultiMediaInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      show_preview: false,
      text: '',
    }
    this.mediaRef = React.createRef();
  }


  displayPreview = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      show_preview: true,
    })
  }

  clearInput = () => {
    this.mediaRef.current.value = null;
    this.setState({show_preview: false, file: null, text: ''})
  }

  handleChange = (event) => {
    this.setState({text: event.target.value});
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.props.id, this.state.text, this.mediaRef.current.files[0]);
    this.clearInput();
  }

  render() {
    const { className, value, handleSubmit, id, placeholder, rows, noReturn } = this.props;
    return (
      <div className={classNames(
        "multimedia-input-rct-component",
        className,
      )}>
        <div className="input-row-container">
          <ExpandingTextInput className={className} value={this.state.text} handleChange={this.handleChange} id={`${placeholder}${id}`} handleSubmit={this.handleSubmit} placeholder={placeholder} rows={rows} noReturn={noReturn}/>
          <input className={'add-image-input'} type="file" name={`${placeholder}${id}`} id={`${placeholder}${id}`} accept="image/*" encType="multipart/form-data" ref={this.mediaRef} onChange={this.displayPreview}/>
          <label className={'add-image-label'} htmlFor={`${placeholder}${id}`}></label>
          <button className={'submit-button'} onClick={() => {
            handleSubmit(id, this.state.text, this.mediaRef.current.files[0]);
            this.clearInput();
          }}>send</button>
        </div>
        <div className={`image-preview ${this.state.show_preview && 'show-preview'}`}>
          <img className={'image-preview-image'} src={this.state.file}/>
          <div className={'cancel-button'} onClick={this.clearInput}>
            x
          </div>
        </div>
      </div>
    );
  }
};

MultiMediaInput.propTypes = {
  className: PropTypes.string,
};

MultiMediaInput.defaultProps = {
  className: '',
};

export default MultiMediaInput;
