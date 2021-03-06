import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import Post from 'containers/Post';

import './index.css';

class ReportedDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // props.getPost(props.match.params.item_id);
    const item_id = props.match.params.item_id;
    const item_type = props.match.params.item_type;
    switch (item_type) {
      case 'post':
        props.getReportedPost(item_id);
        break;
      case 'comment':
        props.getCommentPost({item_id, reported: true}); // not written yet!
        break;
      case 'reply':
        props.getReplyComment({item_id, reported: true}); // not written yet!
        break;
    }
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

ReportedDetailsPage.propTypes = {
};

ReportedDetailsPage.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'getReportedPost',
  'getCommentPost',
  'getReplyComment',
]);

const stateMapper = getRdxSelectionMapper({
  pathname: 'getPathname',
  post: 'getPost',
});

export default withRouter(connect(stateMapper, actionsMapper)(ReportedDetailsPage));
