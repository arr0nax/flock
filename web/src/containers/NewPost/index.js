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
      newPost: ''
    }
  }

  handlePost = () => {
    this.props.postPost({
      text: this.props.newPost
    })
  }

  handleChangePost = (event) => {
    this.props.composePost(event.target.value);
  }
  render() {
    return (
      <div className="new-post-rct-component">
        <ExpandingTextInput value={this.props.newPost} handleChange={(e) => this.handleChangePost(e)} rows={3} handleSubmit={this.handlePost} noReturn className={'new-post-input'}/>
        {this.props.newPostRequested ? (
          <p>loading</p>
        ) : (
          <button className="button" onClick={() => this.handlePost()} >
            post
          </button>
        )
        }
        {Object.keys(this.props.newPostError).map(key => {
          return <p>{this.props.newPostError[key]}</p>
        })}
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
  'composePost'
]);

const stateMapper = getRdxSelectionMapper({
  newPost: 'getNewPost',
  newPostRequested: 'getNewPostRequested',
  newPostError: 'getNewPostErrors',
});

export default connect(stateMapper, actionsMapper)(NewPost);
