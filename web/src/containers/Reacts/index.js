import React from 'react';
// import PropTypes from 'prop-types';
// import customPropTypes from 'lib/customPropTypes';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/propsMapping';

import './index.css';

class Reacts extends React.Component {
  getReact(react) {
    console.log(react);
    switch(react) {
      case 'like':
        return '👍';
      case 'love':
        return '❤️';
      case 'haha':
        return '😂';
      case 'wow':
        return '😮';
      case 'sad':
        return '😢';
      case 'angry':
        return '😡';
    }
  }

  getReacts() {
    const { item, item_type } = this.props;
    console.log(item);
    if (item) {
      if (item_type === 'post' && this.props.post_reacts[item.id]) {
        return this.props.post_reacts[item.id].map(react => {
          return <p key={`react${react.id}`}>{this.getReact(react.react)}</p>;
        })
      } else if (item_type === 'comment' && this.props.comment_reacts[item.id]) {
        return this.props.comment_reacts[item.id].map(react => {
          return <p key={`react${react.id}`}>{this.getReact(react.react)}</p>;
        })
      } else if (item_type === 'reply' && this.props.reply_reacts[item.id]) {
        return this.props.reply_reacts[item.id].map(react => {
          return <p key={`react${react.id}`}>{this.getReact(react.react)}</p>;
        })
      }
      return null;
    }
    return null;
  }

  render() {
    console.log('hello');
    return (
      <div className="reacts-rct-component">
        {this.getReacts()}
      </div>
    )
  }
}

Reacts.propTypes = {
};

Reacts.defaultProps = {
  item: {},
  item_type: null,
};

const actionsMapper = getRdxActionMapper([
]);

const stateMapper = getRdxSelectionMapper({
  post_reacts: 'getPostReacts',
  reply_reacts: 'getReplyReacts',
  comment_reacts: 'getCommentReacts',
});

export default connect(stateMapper, actionsMapper)(Reacts);
