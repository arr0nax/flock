import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import {default as Reacts} from './reacts';
import {default as UserSummary} from '../components/user-summary';
import {default as ReactCarousel} from '../components/react-carousel';
import { getRdxActionMapper, getRdxSelectionMapper } from '../rdx/utils/propsMapping';


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
        <View className="reply" key={`reply${reply.id}`} style={{marginBottom: 20}}>
          <View className="reply-box" style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
            <UserSummary user={this.props.users[reply.user_id]} smallname/>
            <View style={{flex: 1, flexDirection: 'column', position: 'relative', marginTop: 15, marginLeft: 9, height: 'auto', height: 20}} >
              <Text style={{fontSize: 16}}>{reply.text}</Text>
              <View style={[styles.reacts, {position: 'relative', height: 18}]}>
                <Reacts item={reply} type={'reply'}/>
              </View>
            </View>
          </View>
          <ReactCarousel item_id={reply.id} item_type="reply" enableScroll={this.props.enableScroll} disableScroll={this.props.disableScroll} />
        </View>
      ));
    }
  }

  reply() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextInput style={{height: 30, flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 15, marginTop: 8, paddingLeft: 10}} value={this.state.reply} placeholder={'write a reply'} onChangeText={(e) => this.handleChangeReply(e)} />
        <Button
          onPress={() => this.handleReply()}
          title="reply"
          color="#add8e6"
          style={{flex:1, width: 50, padding: 0}}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{marginLeft: 30}}>
        <Text onPress={this.toggleOpen} style={{position: 'absolute', top: -20, left: 65, color: '#add8e6'}}>{this.state.open ? 'hide replies' : 'show replies'}</Text>
        <View style={ [(this.state.open ? { display:'auto'} : {display: 'none'}), {marginTop: 20}] }>
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
