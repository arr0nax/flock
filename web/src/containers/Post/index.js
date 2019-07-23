import React from 'react';
import LinkPreviewText from 'components/LinkPreviewText';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import UserSummary from 'components/UserSummary';
import ReactCarousel from 'components/ReactCarousel';
import Reacts from 'containers/Reacts';
import Comments from 'containers/Comments';
import ReportContentButton from 'components/ReportContentButton';
import DeleteContentButton from 'components/DeleteContentButton';

import './index.css';

class Post extends React.Component {
  render() {
    const { post, allowReact, allowComment, showComments, allowReply, showReplies } = this.props;
    return (
      <div className="post-rct-component">
        <DeleteContentButton item_id={post.id} item_type={'post'} user_id={post.user_id} className="post"/>
        <ReportContentButton item_id={post.id} item_type={'post'} user_id={post.user_id} className="post"/>
        <UserSummary user={this.props.users[post.user_id]} className="white" timestamp={post.created_at}/>
        <LinkPreviewText text={post.text} className='post'/>
        <div className="action-bar">
          {allowReact && <ReactCarousel item_id={post.id} type="post"/>}
        </div>
        <Reacts item={post} item_type={'post'} />
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
