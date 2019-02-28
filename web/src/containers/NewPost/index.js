import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
import ExpandingTextInput from 'components/ExpandingTextInput'
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ''
    }
  }

  handlePost() {
    this.props.postPost({
      text: this.state.post
    })
  }

  handleChangePost = (event) => {
    this.setState({post: event.target.value});
  }
  render() {
    return (
      <div className="new-post-rct-component">
        <ExpandingTextInput value={this.state.post} handleChange={(e) => this.handleChangePost(e)} rows={3} />
        <button className="button" onClick={() => this.handlePost()} >
          post
        </button>
      </div>
    );
  }
}

NewPost.propTypes = {
};

NewPost.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'postPost',
]);

const stateMapper = getRdxSelectionMapper({
});

export default connect(stateMapper, actionsMapper)(NewPost);
