import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import Post from 'containers/Post';

import './index.css';

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.getPost(props.match.params.item_id);
    // props.getPost()
  }
  render() {
    const { post } = this.props;
    return (
      <div className="details-page-rct-component">
        <Post
          key={`post${post.id}`}
          post={post}
          showComments
          allowComment
          showReplies
          allowReply
          allowReact
        />
      </div>
    );
  }
}

DetailsPage.propTypes = {
};

DetailsPage.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'getPost',
]);

const stateMapper = getRdxSelectionMapper({
  pathname: 'getPathname',
  post: 'getPost',
});

export default withRouter(connect(stateMapper, actionsMapper)(DetailsPage));
