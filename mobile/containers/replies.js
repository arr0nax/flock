import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import {default as Reacts} from 'mobile/containers/reacts';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';


class Replies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: '',
    };
  }

  handleChangeReply(event) {
    this.setState({reply: event});
  }

  handleReply() {
    this.props.postReply({
      text: this.state.reply,
      comment_id: this.props.comment.id,
    })
    this.setState({reply: ''});
  }

  replies() {
    if (this.props.comment) {
      console.log('replies incoming');
      return this.props.replies[this.props.comment.id] && this.props.replies[this.props.comment.id].map(reply => (
        <View className="reply" key={`reply${reply.id}`}>
          <Text>{reply.text}</Text>
          <View>
            <Reacts item={reply} type="reply" />
          </View>
          <ReactCarousel item_id={reply.id} type="reply"/>
        </View>
      ));
    }
  }

  reply() {
    return (
      <View>
        <TextInput style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}} value={this.state.reply} onChangeText={(e) => this.handleChangeReply(e)} />
        <Button
          onPress={() => this.handleReply()}
          title="reply"
          color="#841584"
        />
      </View>
    )
  }

  render() {
    console.log('am replying!');
    return (
      <View>
        {this.replies()}
        {this.reply()}
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

const actionsMapper = getRdxActionMapper([
  'postReply',
]);

const stateMapper = getRdxSelectionMapper({
  replies: 'getReplies',
});

export default connect(stateMapper, actionsMapper)(Replies);
