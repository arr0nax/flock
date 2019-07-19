import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import actions from '../actions';
import { getRdxActionMapper, getRdxSelectionMapper } from '../rdx/utils/propsMapping';

const defaultPostHeight = 90;

class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: "",
      height: defaultPostHeight,
    }
  }

  handlePost() {
    this.props.postPost({
      text: this.state.post
    })
    this.setState({height: defaultPostHeight, post: ''})
  }

  handleChangePost(event) {
    this.setState({post: event.target.value});
  }

  updateSize = (height) => {
    this.setState({
      height: height + 8
    });
  }


  render() {
    return (
      <View style={{marginLeft: 10, marginRight: 10, marginBottom: 30, flex: 1, flexDirection: 'column', minHeight: 120}}>
        <TextInput
          style={{ height: this.state.height, minHeight: 90, maxHeight: 180, width: '100%', borderColor: 'gray', borderWidth: 1, borderRadius: 15, fontSize: 16, padding: 4}}
          onChangeText={(post) => this.setState({post})}
          onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
          value={this.state.post}
          placeholder={'write a post'}
          multiline
        />
        <Button
          onPress={() => this.handlePost()}
          title="post"
          color="#add8e6"
          style={{height: 30, minHeight: 30}}
        />
      </View>
    );
  }
}

NewPost.propTypes = {

};

NewPost.defaultProps = {
  postLogin: () => {},
  postLogout: () => {},
  auth: {},
};

const actionsMapper = getRdxActionMapper([
  'postPost',
]);

const stateMapper = getRdxSelectionMapper({

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

export default connect(stateMapper, actionsMapper)(NewPost);
