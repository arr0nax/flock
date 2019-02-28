import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text } from 'react-native';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';


class Reacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getReact(react) {
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

  reacts() {
    if (this.props.item) {
      if (this.props.type === 'post') {
        return this.props.post_reacts[this.props.item.id] && this.props.post_reacts[this.props.item.id].map(react => {
          return <Text key={`react${react.id}`}>{this.getReact(react.react)}</Text>;
        })
      } else if (this.props.type === 'comment') {
        return this.props.comment_reacts[this.props.item.id] && this.props.comment_reacts[this.props.item.id].map(react => {
          return <Text key={`react${react.id}`}>{this.getReact(react.react)}</Text>;
        })
      } else if (this.props.type === 'reply') {
        return this.props.reply_reacts[this.props.item.id] && this.props.reply_reacts[this.props.item.id].map(react => {
          return <Text key={`react${react.id}`}>{this.getReact(react.react)}</Text>;
        })
      }
    }
  }

  render() {
    return (
      <View>
        {this.reacts()}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const actionsMapper = getRdxActionMapper([]);

const stateMapper = getRdxSelectionMapper({
  post_reacts: 'getPostReacts',
  comment_reacts: 'getCommentReacts',
  reply_reacts: 'getReplyReacts',
});

export default connect(stateMapper, actionsMapper)(Reacts);
