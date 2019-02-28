import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text, FlatList, RefreshControl } from 'react-native';
import {default as ReactCarousel} from 'mobile/components/react-carousel';
import {default as Comments} from 'mobile/containers/comments';
import {default as Reacts} from 'mobile/containers/reacts';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';


class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
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
    console.log('hello refreshing', );
    console.log(this.props.postsRequested);
    this.props.getPosts();
    if (this.props.logged_in) this.props.getNotifications();
  }

  posts = (item) => {
    const post = item.item;
    return (
      <View className="post" key={`post${post.id}`}>
        <Text>{post.text}</Text>
        <View style={styles.reacts}>
          <Reacts item={post} type="post"/>
        </View>
        <ReactCarousel item_id={post.id} type="post"/>
        <View className="comments">
          <Comments post={post} />
        </View>
      </View>
    )
  }


  render() {
    return (
      <View>
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

const actionsMapper = getRdxActionMapper([
  'getPosts',
]);

const stateMapper = getRdxSelectionMapper({
  posts: 'getPosts',
  postsRequested: 'getPostsRequested',
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
