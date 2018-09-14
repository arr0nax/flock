import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import actions from '../actions';
import ReactCarousel from '../components/react-carousel';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      post: "",
      comment: {},
      reply: {}
    }

    this.props.dispatch(actions.getPosts());
  }

  handleLogin() {
    this.props.dispatch(actions.login({
      email: this.state.email,
      password: this.state.password,
    }))
  }

  handleRegister() {
    this.props.dispatch(actions.register({
      email: this.state.email,
      password: this.state.password,
    }))
  }

  handlePost() {
    this.props.dispatch(actions.post({
      text: this.state.post
    }))
  }

  handleComment(post) {
    this.props.dispatch(actions.comment({
      text: this.state.comment[post.id],
      post_id: post.id,
    }))
    var newComment = {
      ...this.state.comment
    };
    newComment[post.id] = '';
    this.setState({comment: newComment});
  }

  handleReply(post, comment) {
    this.props.dispatch(actions.reply({
      text: this.state.reply[comment.id],
      comment_id: comment.id,
    }))
    var newReply = {
      ...this.state.reply
    };
    newReply[comment.id] = '';
    this.setState({reply: newReply});
  }

  handleReact(react, item_id, type) {
    this.props.dispatch(actions.react({
      react,
      item_id,
      type,
    }))
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

  reacts(item, type) {
    if (item) {
      if (type === 'post') {
        return this.props.reacts.post_reacts[item.id].map(react => {
          return <Text>{react.react}</Text>;
        })
      } else if (type === 'comment') {
        return this.props.reacts.comment_reacts[item.id].map(react => {
          return <Text>{react.react}</Text>;
        })
      } else if (type === 'reply') {
        return this.props.reacts.reply_reacts[item.id].map(react => {
          return <Text>{react.react}</Text>;
        })
      }
    }
  }

  replies(comment) {
    if (comment) {
      return this.props.replies.replies[comment.id].map(reply => (
        <View className="reply">
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
    return this.props.comments.comments[post.id].map(comment => {
      return (
        <View className="comment">
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

  posts() {
    return this.props.posts.posts.map(post => {
      return (
        <View className="post">
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
    });
  }


  render() {
    return (
      <ScrollView>
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
        <View>
          {this.posts()}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
    comments: state.comments,
    replies: state.replies,
    reacts: state.reacts,
  }
}

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

export default connect(mapStateToProps)(Main)
