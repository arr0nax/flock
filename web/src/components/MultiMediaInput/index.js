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
    }
  }

  displayPreview = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      show_preview: true,
    })
  }

  clearInput = () => {
    console.log(this.props.innerRef);
    this.props.innerRef.current.value = null;
    this.setState({show_preview: false, file: null})
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.props.id);
    this.clearInput();
  }

  render() {
    const { className, value, handleChange, handleSubmit, id, placeholder, rows, noReturn, innerRef } = this.props;
    return (
      <div className={classNames(
        "multimedia-input-rct-component",
        className,
      )}>
        <div className="input-row-container">
          <ExpandingTextInput className={className} value={value} handleChange={handleChange} id={id} handleSubmit={this.handleSubmit} placeholder={placeholder} rows={rows} noReturn={noReturn}/>
          <input className={'add-image-input'} type="file" name="file" id="file" accept="image" encType="multipart/form-data" ref={innerRef} onChange={this.displayPreview}/>
          <label className={'add-image-label'} htmlFor="file"></label>
          <button className={'submit-button'} onClick={() => {handleSubmit(id);this.clearInput();}}>send</button>
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

export default React.forwardRef((props, ref) => <MultiMediaInput innerRef={ref} {...props} />);
