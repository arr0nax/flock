import React from 'react';
import Textarea from 'react-textarea-autosize';
import MultiMediaInput from 'components/MultiMediaInput';
import LinkPreviewText from 'components/LinkPreviewText';

// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import UserSummary from 'components/UserSummary';
import ReactCarousel from 'components/ReactCarousel';
import Reacts from 'containers/Reacts';
import ReportContentButton from 'components/ReportContentButton';
import DeleteContentButton from 'components/DeleteContentButton';
import Image from 'components/Image';
import './index.css';
const FILES_ENDPOINT = process.env.REACT_APP_FILES_ENDPOINT;




class Replies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: {},
      open: false,
    };
  }

  // mediaRef = React.createRef();



  // handleChangeReply = (event, id) => {
  //   var newReply = {
  //     ...this.state.reply
  //   };
  //   newReply[id] = event.target.value;
  //   this.setState({reply: newReply});
  // }

  toggleOpen = () => {
    this.setState({open: !this.state.open})
  }

  handleReply = (comment_id, text, file) => {
    if (text || file) {
      this.props.postReply({
        text: text,
        comment_id: comment_id,
        attachment: file,
      })
      // var newReply = {
      //   ...this.state.reply
      // };
      // newReply[comment_id] = '';
      // this.setState({reply: newReply});
      // this.mediaRef.current.value = null;
    }
  }

  replies() {
    const { comment_id } = this.props;
    if (!this.props.replies[comment_id] || !this.props.replies[comment_id].length) return null;
    return this.props.replies[comment_id].map(reply => {
      return (
        <div className="reply-container" key={`reply${reply.id}`}>
          <div className="reply">
            <UserSummary user={this.props.users[reply.user_id]} timestamp={reply.created_at} className="smallName"/>
            <div className="reply-text-container">
            <LinkPreviewText className="reply" text={reply.text} />
            {this.props.reply_attachments[reply.id] ? (
              <Image source={`${FILES_ENDPOINT}/reply/${reply.id}/${this.props.reply_attachments[reply.id].filename}`} />
            ) : (
              null
            )}
            <Reacts item={reply} item_type={'reply'} className='reply'/>
            </div>
          </div>
          <div className='reply-react-container'>
            <ReactCarousel item_id={reply.id} type="reply" className="comment"/>
          </div>
          <ReportContentButton item_id={reply.id} item_type={'reply'} user_id={reply.user_id} className="reply"/>
          <DeleteContentButton item_id={reply.id} item_type={'reply'} user_id={reply.user_id} parent_id={comment_id} className="reply"/>
        </div>
      );
    });
  }

  reply() {
    const { comment_id } = this.props;
    return (
      <div className="reply-input-container">
        <MultiMediaInput
          handleChange={this.handleChangeReply}
          handleSubmit={this.handleReply}
          id={comment_id}
          placeholder={'reply'}
        />
      </div>
    )
  }


  render() {
    const {showReplies, allowReply, comment_id} = this.props;
    return (
      <div className={`replies-rct-component ${this.state.open ? 'open' : ''}`}>
        <p onClick={this.toggleOpen} className="show-replies">{(!this.props.replies[comment_id] || !this.props.replies[comment_id].length) ? 'reply' : `${this.state.open ? 'hide' : 'show'} replies`}</p>
        {this.state.open &&
            <div className="replies-container">
              {showReplies && this.replies()}
              {allowReply && this.reply()}
            </div>
        }
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
  reply_attachments: 'getReplyAttachments',
  users: 'getUsers',
});

export default connect(stateMapper, actionsMapper)(Replies);
