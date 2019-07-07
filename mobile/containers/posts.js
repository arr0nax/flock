import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text, FlatList, RefreshControl } from 'react-native';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import {default as UserSummary} from 'mobile/components/user-summary';
import {default as Comments} from 'mobile/containers/comments';
import {default as Reacts} from 'mobile/containers/reacts';
import {default as NewPost} from 'mobile/containers/newpost';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';


class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      scroll: true,
    };
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    if ((prevProps.postsRequested || prevProps.notificationsRequested) && (!this.props.postsRequested && !this.props.notificationsRequested)) {
      this.setState({refreshing: false})
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.props.getPosts();
    if (this.props.logged_in) this.props.getNotifications();
  }

  _onEndReached = () => {
    if (!this.props.postsRequested) {
      this.props.getMorePosts({page: (this.props.postsPagination.page + 1)});
    }
  }

  enableScroll = () => {
    this.setState({scroll: true})
  }

  disableScroll = () => {
    this.setState({scroll: false})
  }

  posts = (item) => {
    const post = item.item;
    return (
      <View className="post" key={`post${post.id}`} style={{flex: 1}}>
        <UserSummary user={this.props.users[post.user_id]} />
        <View>
          <Text style={{fontSize: 22, marginTop: 4, marginBottom: 4}}>{post.text}</Text>
          <View style={styles.reacts}>
            <Reacts item={post} type="post"/>
          </View>
        </View>
        <ReactCarousel item_id={post.id} item_type="post" enableScroll={this.enableScroll} disableScroll={this.disableScroll}/>
        <View className="comments" style={{}}>
          <Comments post={post} enableScroll={this.enableScroll} disableScroll={this.disableScroll}/>
        </View>
      </View>
    )
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <NewPost />
        <FlatList
          style={{flex: 1, flexDirection: 'column'}}
          data={this.props.posts}
          renderItem={this.posts}
          scrollEnabled={this.state.scroll}
          onEndReached={this._onEndReached}
          ListEmptyComponent={
            <Text style={{flex: 1, fontStyle: 'italic', color: 'grey', textAlign: 'center'}}>pull down to refresh!</Text>
          }
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

const actionsMapper = getRdxActionMapper([
  'getPosts',
  'getMorePosts',
]);

const stateMapper = getRdxSelectionMapper({
  posts: 'getPosts',
  postsRequested: 'getPostsRequested',
  postsPagination: 'getPostsPagination',
  users: 'getUsers',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(stateMapper, actionsMapper)(Posts);
