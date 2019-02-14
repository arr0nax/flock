import React from 'react';
import Textarea from 'react-textarea-autosize';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import UserSummary from 'components/UserSummary';
import ReactCarousel from 'components/ReactCarousel';
import Reacts from 'containers/Reacts';

import './index.css';

class Replies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: {}
    };
  }

  handleChangeReply(event, comment_id) {
    var newReply = {
      ...this.state.reply
    };
    newReply[comment_id] = event.target.value;
    this.setState({reply: newReply});
  }

  checkForSubmit(event, comment_id) {
    console.log(event);
    
  }

  handleReply(comment_id) {
    this.props.postReply({
      text: this.state.reply[comment_id],
      comment_id: comment_id,
    })
    var newReply = {
      ...this.state.reply
    };
    newReply[comment_id] = '';
    this.setState({reply: newReply});
  }

  replies() {
    const { comment_id } = this.props;
    if (!this.props.replies[comment_id] || !this.props.replies[comment_id].length) return null;
    return this.props.replies[comment_id].map(reply => {
      return (
        <div className="reply-container" key={`reply${reply.id}`}>
          <div className="comment">
            <UserSummary user={this.props.users[reply.user_id]} className="smallName"/>
            <p className="comment-text">{reply.text}</p>
          </div>
          <Reacts item={reply} item_type={'reply'} />
          <ReactCarousel item_id={reply.id} type="reply" className="comment"/>
        </div>
      );
    });
  }

  reply() {
    const { comment_id } = this.props;
    return (
      <div className="reply-input-container">
        <Textarea className="reply-input" value={this.state.reply[comment_id]} onChange={(e) => this.handleChangeReply(e, comment_id)} onKeyPress={(e) => this.checkForSubmit(e, comment_id)}/>
      </div>
    )
  }


  render() {
    const {showReplies, allowReply} = this.props;
    return (
      <div className="replies-rct-component">
        {showReplies && this.replies()}
        {allowReply && this.reply()}
      </div>
    )
  }
}

Replies.propTypes = {
};

Replies.defaultProps = {
};

const actionsMapper = getRdxActionMapper([
  'postReply',
]);

const stateMapper = getRdxSelectionMapper({
  replies: 'getReplies',
  users: 'getUsers',
});

export default connect(stateMapper, actionsMapper)(Replies);
