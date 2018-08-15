import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import actions from './actions';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      post: '',
      comment: {},
      reply: {}
    }
    this.props.dispatch(actions.getPosts());
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleChangePost(event) {
    this.setState({post: event.target.value});
  }

  handleChangeComment(event, post) {
    var newComment = {
      ...this.state.comment
    };
    newComment[post._id] = event.target.value;
    this.setState({comment: newComment});
  }

  handleChangeReply(event, comment) {
    var newReply = {
      ...this.state.reply
    };
    newReply[comment._id] = event.target.value;
    this.setState({reply: newReply});
  }

  handleLogin() {
    this.props.dispatch(actions.login({
      username: this.state.username,
      password: this.state.password,
    }));
  }

  handleLogout() {
    this.props.dispatch(actions.logout());
  }

  handleRegister() {
    this.props.dispatch(actions.register({
      username: this.state.username,
      password: this.state.password,
    }))
  }

  handlePost() {
    this.props.dispatch(actions.post({
      content: this.state.post
    }))
  }

  handleComment(post) {
    this.props.dispatch(actions.comment({
      content: this.state.comment[post._id],
      postId: post._id,
    }))
    var newComment = {
      ...this.state.comment
    };
    newComment[post._id] = '';
    this.setState({comment: newComment});
  }

  handleReply(post, comment) {
    this.props.dispatch(actions.reply({
      content: this.state.reply[comment._id],
      postId: post._id,
      commentId: comment._id,
    }))
    var newReply = {
      ...this.state.reply
    };
    newReply[comment._id] = '';
    this.setState({reply: newReply});
  }

  replies(comment) {
    if (comment) {
      return this.props.replies.replies[comment._id].map(reply => (<text>{reply.text}</text>));
    }
  }

  reacts(item) {
    if (item) {
      return <text>{this.props.reacts.reacts[item._id].react}</text>;
    }
  }

  comments(post) {
    return this.props.comments.comments[post._id].map(comment => {
      return (
        <div className="comment">
          <text>{comment.text}</text>
          <div className="replies">
            {this.replies(comment)}
            <input value={this.state.reply[comment._id]} onChange={(e) => this.handleChangeReply(e, comment)} />
            <div className="button" onClick={() => this.handleReply(post, comment)}>
              <text>reply</text>
            </div>
          </div>
        </div>
      )
    });
  }

  posts() {
    return this.props.posts.posts.map(post => {
      return (
        <div className="post">
          <text>{post.content}</text>
          <div className="reacts">
            {this.reacts(post)}
          </div>
          <div className="comments">
            {this.comments(post)}
            <input value={this.state.comment[post._id]} onChange={(e) => this.handleChangeComment(e, post)} />
            <div className="button" onClick={() => this.handleComment(post)}>
              <text>comment</text>
            </div>
          </div>
        </div>
      )
    });
  }

  render() {
    return (
      <div className="App">
      {this.props.auth.logged_in ? (
        <div className="button" onClick={() => this.handleLogout()}>
          <text>logout</text>
        </div>
      ) : (
        null
      )}
        <div>
          <input value={this.state.username} onChange={(e) => this.handleChangeUsername(e)}/>
          <input type="password" value={this.state.password} onChange={(e) => this.handleChangePassword(e)}/>
          <div className="button" onClick={() => this.handleLogin()}>
            <text>login</text>
          </div>
          <div className="button" onClick={() => this.handleRegister()}>
            <text>register</text>
          </div>
        </div>
        <div>
          <input value={this.state.post} onChange={(e) => this.handleChangePost(e)} />
          <div className="button" onClick={() => this.handlePost()}>
            <text>post</text>
          </div>
        </div>
        <div className="posts">
          {this.posts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    posts: state.posts,
    comments: state.comments,
    replies: state.replies,
    reacts: state.reacts,
  }
}

export default connect(mapStateToProps)(App);
