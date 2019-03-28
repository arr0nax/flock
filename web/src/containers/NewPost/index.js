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

  handlePost = () => {
    this.props.postPost({
      text: this.props.post
    })
  }

  handleChangePost = (event) => {
    this.props.composePost(event.target.value);
  }
  render() {
    console.log(this.props.post);
    return (
      <div className="new-post-rct-component">
        <ExpandingTextInput value={this.props.post} handleChange={(e) => this.handleChangePost(e)} rows={3} handleSubmit={this.handlePost}/>
        {this.props.postRequested ? (
          <p>loading</p>
        ) : (
          <button className="button" onClick={() => this.handlePost()} >
            post
          </button>
        )
        }
        {Object.keys(this.props.postError).map(key => {
          return <p>{this.props.postError[key]}</p>
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
  post: 'getPost',
  postRequested: 'getPostRequested',
  postError: 'getPostErrors',
});

export default connect(stateMapper, actionsMapper)(NewPost);
