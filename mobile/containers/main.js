import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView, RefreshControl, FlatList } from 'react-native';
import actions from '../actions';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import {default as Notifications} from 'mobile/components/notifications';
import {default as Reacts} from 'mobile/containers/reacts';
import {default as Replies} from 'mobile/containers/replies';
import {default as Comments} from 'mobile/containers/comments';
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
      shownotifications: false,
    }

    if (this.props.logged_in) this._onRefresh();
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    if ((prevProps.postsRequested || prevProps.notificationsRequested) && (!this.props.postsRequested && !this.props.notificationsRequested)) {
      this.setState({refreshing: false})
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    console.log('hello refreshing', );
    console.log(this.props.postsRequested);
    this.props.getPosts();
    if (this.props.logged_in) this.props.getNotifications();
  }



  handleLogin() {
    this.props.requestLogin({
      email: this.state.email,
      password: this.state.password,
    })
  }

  handleLogout() {
    this.props.requestLogout()
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





  reacts(item, type) {
    return <Reacts item={item} type={type} />
  }

  replies(comment) {
    return <Replies comment={comment} />
  }

  comments(post) {
    return <Comments post={post} />
  }

  posts = (item) => {
    const post = item.item;
    return (
      <View className="post" key={`post${post.id}`}>
        <Text>{post.text}</Text>
        <View style={styles.reacts}>
          {this.reacts(post, 'post')}
        </View>
        <ReactCarousel item_id={post.id} type="post"/>
        <View className="comments">
          {this.comments(post)}
        </View>
      </View>
    )
  }


  render() {
    return (
      <View>
        {
          this.props.logged_in ? (
            <View>
              <Text>{this.props.user.first_name}
              {this.props.user.last_name}</Text>
              <Image source={{ uri: this.props.user.image }} style={{ width: 50, height: 50 }} />
              <ImageUpload auth={this.props.auth} />
              <Button
                onPress={() => this.handleLogout()}
                title="logout"
                color="#841584"
              />
              <Notifications />
            </View>
          ) : (
            <View style={{marginTop: 50}}>
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
        <FlatList
          style={{flex: 1}}
          data={this.props.posts}
          renderItem={this.posts}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
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
  postsRequested: 'getPostsRequested',
  comments: 'getComments',
  replies: 'getReplies',
  post_reacts: 'getPostReacts',
  comment_reacts: 'getCommentReacts',
  reply_reacts: 'getReplyReacts',
  notifications: 'getNotifications',
  notificationsRequested: 'getNotificationsRequested',
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
