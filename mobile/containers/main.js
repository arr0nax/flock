import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView, RefreshControl, FlatList } from 'react-native';
import actions from '../actions';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';
import {default as ImageUpload} from 'mobile/components/image-upload';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      post: "",
      comment: {},
      reply: {},
      refreshing: false,
    }

    this.props.getPosts();
    if (this.props.logged_in) this.props.getNotifications();
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    if ((prevProps.activeRequests.GET_POSTS_REQUEST || prevProps.activeRequests.GET_NOTIFICATIONS_REQUEST) && (!this.props.activeRequests.GET_POSTS_REQUEST && !this.props.activeRequests.GET_NOTIFICATIONS_REQUEST)) {
      this.setState({refreshing: false})
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getPosts();
    if (this.props.logged_in) this.props.getNotifications();
  }



  handleLogin() {
    this.props.requestLogin({
      email: this.state.email,
      password: this.state.password,
    })
  }

  handleRegister() {
    this.props.requestRegister({
      email: this.state.email,
      password: this.state.password,
    })
  }

  handlePost() {
    this.props.postPost({
      text: this.state.post
    })
  }

  handleComment(post) {
    this.props.postComment({
      text: this.state.comment[post.id],
      post_id: post.id,
    })
    var newComment = {
      ...this.state.comment
    };
    newComment[post.id] = '';
    this.setState({comment: newComment});
  }

  handleReply(post, comment) {
    this.props.postReply({
      text: this.state.reply[comment.id],
      post_id: post.id,
      comment_id: comment.id,
    })
    var newReply = {
      ...this.state.reply
    };
    newReply[comment.id] = '';
    this.setState({reply: newReply});
  }

  handleReact(react, item_id, item_type) {
    this.props.postReact({
      react,
      item_id,
      item_type,
    })
  }

  handleChangePost(event) {
    this.setState({post: event.target.value});
  }

  handleChangeComment(event, post) {
    var newComment = {
      ...this.state.comment
    };
    newComment[post.id] = event;
    this.setState({comment: newComment});
  }

  handleChangeReply(event, comment) {
    var newReply = {
      ...this.state.reply
    };
    newReply[comment.id] = event;
    this.setState({reply: newReply});
  }

  notifications() {
  return this.props.notifications.map(notif => (
    <View className={`notification ${notif.new ? 'new' : ''}`}>
      <Text>{notif.made_by} left a {notif.item_type} on your {notif.parent_type}</Text>
    </View>
  ))};

  reacts(item, type) {
    if (item) {
      if (type === 'post') {
        return this.props.post_reacts[item.id] && this.props.post_reacts[item.id].map(react => {
          return <Text key={`react${react.id}`}>{react.react}</Text>;
        })
      } else if (type === 'comment') {
        return this.props.comment_reacts[item.id] && this.props.comment_reacts[item.id].map(react => {
          return <Text key={`react${react.id}`}>{react.react}</Text>;
        })
      } else if (type === 'reply') {
        return this.props.reply_reacts[item.id] && this.props.reply_reacts[item.id].map(react => {
          return <Text key={`react${react.id}`}>{react.react}</Text>;
        })
      }
    }
  }

  replies(comment) {
    if (comment) {
      return this.props.replies[comment.id] && this.props.replies[comment.id].map(reply => (
        <View className="reply" key={`reply${reply.id}`}>
          <Text>{reply.text}</Text>
          <View style={styles.reacts}>
            {this.reacts(reply, 'reply')}
          </View>
          <ReactCarousel react={this.handleReact.bind(this)} item_id={reply.id} type="reply"/>
        </View>
      ));
    }
  }

  comments(post) {
    return this.props.comments[post.id] && this.props.comments[post.id].map(comment => {
      return (
        <View className="comment" key={`comment${comment.id}`}>
          <Text>{comment.text}</Text>
          <View style={styles.reacts}>
            {this.reacts(comment, 'comment')}
          </View>
          <ReactCarousel react={this.handleReact.bind(this)} item_id={comment.id} type="comment"/>
          <View className="replies">
            {this.replies(comment)}
            <TextInput style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}} value={this.state.reply[comment.id]} onChangeText={(e) => this.handleChangeReply(e, comment)} />
            <Button
              onPress={() => this.handleReply(post, comment)}
              title="reply"
              color="#841584"
            />
          </View>
        </View>
      )
    });
  }

  posts = (item) => {
    const post = item.item;
    return (
      <View className="post" key={`post${post.id}`}>
        <Text>{post.text}</Text>
        <View style={styles.reacts}>
          {this.reacts(post, 'post')}
        </View>
        <ReactCarousel react={this.handleReact.bind(this)} item_id={post.id} type="post"/>
        <View className="comments">
          {this.comments(post)}
          <TextInput style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}} value={this.state.comment[post.id]} onChangeText={(e) => this.handleChangeComment(e, post)} />
          <Button
            onPress={() => this.handleComment(post)}
            title="comment"
            color="#841584"
          />
        </View>
      </View>
    )
  }


  render() {
    return (
      <View
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {
          this.props.logged_in ? (
            <View>
              <Text>{this.props.user.first_name}
              {this.props.user.last_name}</Text>
              <Image source={{ uri: this.props.user.image }} style={{ width: 50, height: 50 }} />
              <ImageUpload auth={this.props.auth} />
              {this.notifications()}
            </View>
          ) : (
            <View>
              <TextInput
                style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
              <TextInput
                style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
              <Button
                onPress={() => this.handleLogin()}
                title="login"
                color="#841584"
              />
            </View>
          )
        }
        <View>
          <TextInput
            style={{height: 40, width: 140, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(post) => this.setState({post})}
            value={this.state.post}
          />
          <Button
            onPress={() => this.handlePost()}
            title="post"
            color="#841584"
          />
        </View>
        <FlatList style={{flex: 1}} data={this.props.posts} renderItem={this.posts} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    users: state.users,
    posts: state.posts,
    comments: state.comments,
    replies: state.replies,
    reacts: state.reacts,
    notifications: state.notifications,
  }
}

Main.propTypes = {

};

Main.defaultProps = {
  getPosts: () => {},
  postLogin: () => {},
  postLogout: () => {},
  auth: {},
  posts: {posts: []}
};

const actionsMapper = getRdxActionMapper([
  'getPosts',
  'requestLogin',
  'requestLogout',
  'postPost',
  'postComment',
  'postReply',
  'postReact',
  'getNotifications',
  'requestRegister'
]);

const stateMapper = getRdxSelectionMapper({
  auth: 'getAuthToken',
  user: 'getUser',
  users: 'getUsers',
  logged_in: 'getLoggedIn',
  posts: 'getPosts',
  comments: 'getComments',
  replies: 'getReplies',
  post_reacts: 'getPostReacts',
  comment_reacts: 'getCommentReacts',
  reply_reacts: 'getReplyReacts',
  notifications: 'getNotifications',
  activeRequests: 'getActiveRequests'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reacts: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(stateMapper, actionsMapper)(Main);
