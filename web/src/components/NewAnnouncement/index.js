import React from 'react';
import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';
import ExpandingTextInput from 'components/ExpandingTextInput'

import './index.css';

class NewAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  onChange = (event) => {
    this.setState({text: event.target.value})
  }

  onSubmit = () => {
    this.props.postAnnouncement(this.state.text);
  }

  render() {
    const { className } = this.props;
    return (
      <div className={classNames(
        "new-announcement-rct-component",
        className,
      )}>
        <ExpandingTextInput value={this.state.text} handleChange={this.onChange} handleSubmit={this.onSubmit}/>
        <button onClick={this.onSubmit}>post</button>
      </div>
    );
  }
}

NewAnnouncement.propTypes = {
  className: PropTypes.string,
};

NewAnnouncement.defaultProps = {
  className: '',
};

const actionsMapper = getRdxActionMapper([
  'postAnnouncement'
]);

const stateMapper = getRdxSelectionMapper({
});

export default connect(stateMapper, actionsMapper)(NewAnnouncement);
