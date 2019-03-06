import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text, FlatList, RefreshControl } from 'react-native';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import {default as UserSummary} from 'mobile/components/user-summary';
import {default as Comments} from 'mobile/containers/comments';
import {default as Reacts} from 'mobile/containers/reacts';
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

  enableScroll = () => {
    this.setState({scroll: true})
  }

  disableScroll = () => {
    this.setState({scroll: false})
  }

  posts = (item) => {
    const post = item.item;
    return (
      <View className="post" key={`post${post.id}`}>
        <UserSummary user={this.props.users[post.user_id]} />
        <View style={{paddingLeft: 10}}>
          <Text style={{fontSize: 22}}>{post.text}</Text>
          <View style={styles.reacts}>
            <Reacts item={post} type="post"/>
          </View>
        </View>
        <ReactCarousel item_id={post.id} item_type="post" enableScroll={this.enableScroll} disableScroll={this.disableScroll}/>
        <View className="comments">
          <Comments post={post} enableScroll={this.enableScroll} disableScroll={this.disableScroll}/>
        </View>
      </View>
    )
  }


  render() {
    return (
      <View>
        <Button
          onPress={() => this._onRefresh()}
          title="refresh"
          color="#841584"
        />
        <FlatList
          style={{flex: 1}}
          data={this.props.posts}
          renderItem={this.posts}
          scrollEnabled={this.state.scroll}
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
]);

const stateMapper = getRdxSelectionMapper({
  posts: 'getPosts',
  postsRequested: 'getPostsRequested',
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
