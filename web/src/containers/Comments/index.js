import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import UserSummary from 'components/UserSummary';
import ReactCarousel from 'components/ReactCarousel';
import Reacts from 'containers/Reacts';
import Replies from 'containers/Replies';

import './index.css';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {}
    };
  }

  handleChangeComment(event, post_id) {
    var newComment = {
      ...this.state.comment
    };
    newComment[post_id] = event.target.value;
    this.setState({comment: newComment});
  }

  handleComment(post_id) {
    this.props.postComment({
      text: this.state.comment[post_id],
      post_id: post_id,
    })
    var newComment = {
      ...this.state.comment
    };
    newComment[post_id] = '';
    this.setState({comment: newComment});
  }

  comments() {
    const { post_id, showReplies, allowReply } = this.props;
    if (!this.props.comments[post_id] || !this.props.comments[post_id].length) return null;
    return this.props.comments[post_id].map(comment => {
      return (
        <div className="comment-container" key={`comment${comment.id}`}>
          <div className="comment">
            <UserSummary user={this.props.users[comment.user_id]} className='smallName'/>
            <p className="comment-text">{comment.text}</p>
          </div>
          <Reacts item={comment} item_type={'comment'} />
          <ReactCarousel item_id={comment.id} type="comment" className="comment"/>
          <Replies
            comment_id={comment.id}
            showReplies
            allowReply
          />
        </div>
      );
    });
  }

  comment() {
    const { post_id } = this.props;
    return (
      <div className="new-comment">
        <input value={this.state.comment[post_id]} onChange={(e) => this.handleChangeComment(e, post_id)} />
        <div className="button" onClick={() => this.handleComment(post_id)}>
          <p>comment</p>
        </div>
      </div>
    )

  }


  render() {
    const {showComments, allowComment} = this.props;
    return (
      <div className="comments-rct-component">
        {showComments && this.comments()}
        {allowComment && this.comment()}
      </div>
    )
  }
}

Comments.propTypes = {
};

Comments.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'postComment',
]);

const stateMapper = getRdxSelectionMapper({
  comments: 'getComments',
  users: 'getUsers',
});

export default connect(stateMapper, actionsMapper)(Comments);
