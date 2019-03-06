import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import {default as Reacts} from 'mobile/containers/reacts';
import {default as Replies} from 'mobile/containers/replies';
import {default as UserSummary} from 'mobile/components/user-summary';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';


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
        <View>
          <TextInput style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}} value={this.state.comment} onChangeText={(e) => this.handleChangeComment(e)} />
          <Button
            onPress={() => this.handleComment()}
            title="comment"
            color="#841584"
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
          <View className="comment" key={`comment${comment.id}`}>
            <View className="comment-box" style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <UserSummary user={this.props.users[comment.user_id]} smallname/>
              <View style={{flex: 1, flexDirection: 'row', position: 'relative', alignItems: 'flex-end', marginTop: 10, marginLeft: 7}} >
                <Text style={{fontSize: 16}}>{comment.text}</Text>
                <View style={[styles.reacts, {position: 'relative', bottom: -5}]}>
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
      <View  style={{marginLeft: 20}}>
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
