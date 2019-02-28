import {default as React} from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, Button } from 'react-native';
import { getRdxActionMapper, getRdxSelectionMapper } from 'mobile/rdx/utils/propsMapping';

class ReactCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleReact(react, item_id, item_type) {
    this.props.postReact({
      react,
      item_id,
      item_type,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.handleReact('like', this.props.item_id, this.props.type)} title="like" />
        <Button onPress={() => this.handleReact('love', this.props.item_id, this.props.type)} title="love" />
        <Button onPress={() => this.handleReact('haha', this.props.item_id, this.props.type)} title="haha" />
        <Button onPress={() => this.handleReact('wow', this.props.item_id, this.props.type)} title="wow" />
        <Button onPress={() => this.handleReact('sad', this.props.item_id, this.props.type)} title="sad" />
        <Button onPress={() => this.handleReact('angry', this.props.item_id, this.props.type)} title="angry" />
      </View>
    );
  }
}

const actionsMapper = getRdxActionMapper([
  'postReact',
]);

const stateMapper = getRdxSelectionMapper({});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(stateMapper, actionsMapper)(ReactCarousel);
