import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button, Text } from 'react-native';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';


class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  posts() {
    return null;
  }

  render() {
    return (
      <View>
        {this.posts()}
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
