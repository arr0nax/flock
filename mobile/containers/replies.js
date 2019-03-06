import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import {default as Reacts} from 'mobile/containers/reacts';
import {default as UserSummary} from 'mobile/components/user-summary';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';


class Replies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: '',
      open: false,
    };
  }

  handleChangeReply(event) {
    this.setState({reply: event});
  }

  toggleOpen = () => {
    this.setState({open: !this.state.open})
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
      return this.props.replies[this.props.comment.id] && this.props.replies[this.props.comment.id].map(reply => (
        <View className="reply" key={`reply${reply.id}`}>
          <View className="reply-box" style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
            <UserSummary user={this.props.users[reply.user_id]} smallname/>
            <View style={{flex: 1, flexDirection: 'row', position: 'relative', alignItems: 'flex-end', marginTop: 10, marginLeft: 7}} >
              <Text style={{fontSize: 16}}>{reply.text}</Text>
              <View style={[styles.reacts, {position: 'relative', bottom: -5}]}>
                <Reacts item={reply} type={'reply'}/>
              </View>
            </View>
          </View>
          <ReactCarousel item_id={reply.id} item_type="reply" enableScroll={this.props.enableScroll} disableScroll={this.props.disableScroll}/>
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
    return (
      <View style={{marginLeft: 20}}>
        <Text onPress={this.toggleOpen}>{this.state.open ? 'hide replies' : 'show replies'}</Text>
        <View style={ this.state.open ? { display:'auto'} : {display: 'none'} }>
          {this.replies()}
          {this.reply()}
        </View>
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
  users: 'getUsers',
});

export default connect(stateMapper, actionsMapper)(Replies);
