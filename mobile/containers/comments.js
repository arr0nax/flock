import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import {default as Reacts} from './reacts';
import {default as Replies} from './replies';
import {default as UserSummary} from '../components/user-summary';
import {default as ReactCarousel} from '../components/react-carousel';
import { getRdxActionMapper, getRdxSelectionMapper } from '../rdx/utils/propsMapping';


class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  handleChangeComment(event) {
    this.setState({comment: event});
  }

  handleComment() {
    this.props.postComment({
      text: this.state.comment,
      post_id: this.props.post.id,
    })
    this.setState({comment: ''});
  }

  comment() {
    if (this.props.post &&  this.props.post.id) {
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TextInput style={{height: 30, flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 15, marginTop: 8, paddingLeft: 10}} value={this.state.comment} placeholder={'write a comment'} onChangeText={(e) => this.handleChangeComment(e)} />
          <Button
            onPress={() => this.handleComment()}
            title="post"
            color="#add8e6"
            style={{flex:1, width: 50, padding: 0}}
          />
        </View>
      )
    } else {
      return null;
    }
  }

  comments() {
    if (this.props.post &&  this.props.post.id) {
      return this.props.comments[this.props.post.id] && this.props.comments[this.props.post.id].map(comment => {
        return (
          <View className="comment" key={`comment${comment.id}`} style={{marginBottom: 20}}>
            <View className="comment-box" style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <UserSummary user={this.props.users[comment.user_id]} smallname/>
              <View style={{flex: 1, flexDirection: 'column', position: 'relative', marginTop: 15, marginLeft: 9, height: 'auto', height: 20}} >
                <Text style={{fontSize: 16}}>{comment.text}</Text>
                <View style={[styles.reacts, {position: 'relative', height: 18}]}>
                  <Reacts item={comment} type={'comment'}/>
                </View>
              </View>
            </View>
            <ReactCarousel item_id={comment.id} item_type="comment" enableScroll={this.props.enableScroll} disableScroll={this.props.disableScroll}/>
            <View className="replies">
              <Replies comment={comment} enableScroll={this.props.enableScroll} disableScroll={this.props.disableScroll}/>
            </View>
          </View>
        )
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <View  style={{marginLeft: 20, marginBottom: 20}}>
        {this.comments()}
        {this.comment()}
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
  'postComment',
]);

const stateMapper = getRdxSelectionMapper({
  comments: 'getComments',
  users: 'getUsers',
});

export default connect(stateMapper, actionsMapper)(Comments);
