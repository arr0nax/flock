import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import UserSummary from 'components/UserSummary';
import ReactCarousel from 'components/ReactCarousel';
import Reacts from 'containers/Reacts';
import Comments from 'containers/Comments';

import './index.css';

class Post extends React.Component {
  render() {
    const { post, allowReact, allowComment, showComments, allowReply, showReplies } = this.props;
    return (
      <div className="post-rct-component">
        <UserSummary user={this.props.users[post.user_id]} className="white"/>
        <h3>{post.text}</h3>
        <Reacts item={post} item_type={'post'} />
        {allowReact && <ReactCarousel item_id={post.id} type="post"/>}
        <Comments
          post_id={post.id}
          showComments
          allowComment
          showReplies
          allowReply
        />
      </div>
    );
  }
}

Post.propTypes = {
};

Post.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
  users: 'getUsers',
});

export default connect(stateMapper, actionsMapper)(Post);
