import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import actions from './actions';
import ReactCarousel from './components/react-carousel';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      post: '',
      comment: {},
      reply: {}
    }
    this.props.dispatch(actions.getPosts());
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
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
    newComment[post.id] = event.target.value;
    this.setState({comment: newComment});
  }

  handleChangeReply(event, comment) {
    var newReply = {
      ...this.state.reply
    };
    newReply[comment.id] = event.target.value;
    this.setState({reply: newReply});
  }

  handleLogin() {
    this.props.dispatch(actions.login({
      email: this.state.email,
      password: this.state.password,
    }));
  }

  handleLogout() {
    this.props.dispatch(actions.logout());
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
      content: this.state.reply[comment.id],
      post_id: post.id,
      commentId: comment.id,
    }))
    var newReply = {
      ...this.state.reply
    };
    newReply[comment.id] = '';
    this.setState({reply: newReply});
  }

  handleReact(react, item, parent_id = null) {
    this.props.dispatch(actions.react({
      react,
      item,
      parent_id,
    }))
  }

  replies(comment) {
    if (comment) {
      return this.props.replies.replies[comment.id].map(reply => (
        <div className="reply">
          <text>{reply.text}</text>
          {this.reacts(reply)}
          <ReactCarousel react={this.handleReact.bind(this)} item={reply} parent_id={comment._post}/>
        </div>
      ));
    }
  }

  reacts(item) {
    // if (item) {
    //   this.props.reacts.reacts.[item.id]
    //   return this.props.reacts.reacts[item.id].map(react => {
    //     return <text>{react.react}</text>;
    //   })
    // }
  }

  comments(post) {
    return this.props.comments.comments[post.id].map(comment => {
      return (
        <div className="comment">
          <text>{comment.text}</text>
          <div className="reacts">
            {this.reacts(comment)}
          </div>
          <ReactCarousel react={this.handleReact.bind(this)} item={comment}/>
          <div className="replies">
            {this.replies(comment)}
            <input value={this.state.reply[comment.id]} onChange={(e) => this.handleChangeReply(e, comment)} />
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
          <text>{post.text}</text>
          <div className="reacts">
            {this.reacts(post)}
          </div>
          <ReactCarousel react={this.handleReact.bind(this)} item={post}/>
          <div className="comments">
            {this.comments(post)}
            <input value={this.state.comment[post.id]} onChange={(e) => this.handleChangeComment(e, post)} />
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
          <input value={this.state.email} onChange={(e) => this.handleChangeEmail(e)}/>
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
